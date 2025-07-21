'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Star, 
  Plus, 
  Trash2, 
  ChevronLeft,
  Monitor,
  ShoppingCart,
  Users,
  BarChart,
  MessageSquare,
  FileText,
  Settings
} from 'lucide-react';
import { useCalculatorStore } from '@/hooks/useCalculatorStore';
import { technologyAssessmentSchema } from '@/lib/validations/calculator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

type TechAssessmentFormData = z.infer<typeof technologyAssessmentSchema>;

const TECH_CATEGORIES = [
  { id: 'crm', name: 'CRM & Sales', icon: Users },
  { id: 'marketing', name: 'Marketing', icon: BarChart },
  { id: 'accounting', name: 'Accounting', icon: DollarSign },
  { id: 'communication', name: 'Communication', icon: MessageSquare },
  { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart },
  { id: 'productivity', name: 'Productivity', icon: FileText },
  { id: 'it', name: 'IT & Security', icon: Monitor },
  { id: 'other', name: 'Other Tools', icon: Settings },
];

interface Tool {
  name: string;
  monthlyCost: number;
  satisfaction: number;
}

export function TechAssessmentStep() {
  const { techAssessment, setTechAssessment, nextStep, prevStep } = useCalculatorStore();
  const [currentTools, setCurrentTools] = useState<Record<string, Tool[]>>(
    techAssessment.currentTools || {}
  );
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const {
    handleSubmit,
  } = useForm<TechAssessmentFormData>({
    resolver: zodResolver(technologyAssessmentSchema),
    defaultValues: techAssessment,
  });

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const addTool = (categoryId: string) => {
    setCurrentTools(prev => ({
      ...prev,
      [categoryId]: [
        ...(prev[categoryId] || []),
        { name: '', monthlyCost: 0, satisfaction: 3 }
      ]
    }));
  };

  const updateTool = (categoryId: string, index: number, field: keyof Tool, value: string | number) => {
    setCurrentTools(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].map((tool, i) =>
        i === index ? { ...tool, [field]: value } : tool
      )
    }));
  };

  const removeTool = (categoryId: string, index: number) => {
    setCurrentTools(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].filter((_, i) => i !== index)
    }));
  };

  const calculateTotalCost = () => {
    return Object.values(currentTools).reduce((total, tools) => {
      return total + tools.reduce((sum, tool) => sum + (tool.monthlyCost || 0), 0);
    }, 0);
  };

  const calculateSatisfactionScores = () => {
    const scores: Record<string, number> = {};
    Object.entries(currentTools).forEach(([category, tools]) => {
      if (tools.length > 0) {
        const avgSatisfaction = tools.reduce((sum, tool) => sum + tool.satisfaction, 0) / tools.length;
        scores[category] = avgSatisfaction;
      }
    });
    return scores;
  };

  const onSubmit = () => {
    // Ensure we have valid satisfaction scores for all categories with tools
    const satisfactionScores = calculateSatisfactionScores();
    
    // Validate that all categories with tools have satisfaction scores
    const validScores: Record<string, number> = {};
    Object.entries(satisfactionScores).forEach(([category, score]) => {
      if (typeof score === 'number' && !isNaN(score)) {
        validScores[category] = score;
      }
    });
    
    const data = {
      currentTools,
      totalMonthlyCost: calculateTotalCost(),
      satisfactionScores: validScores,
    };
    
    console.log('Tech Assessment Data:', data);
    setTechAssessment(data as any);
    nextStep();
  };

  const totalMonthlyCost = calculateTotalCost();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Current Technology Assessment
          </h2>
          <p className="text-gray-600">
            Tell us about the tools you&apos;re currently using and their costs
          </p>
        </div>

        <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Monthly Software Cost</p>
              <p className="text-2xl font-bold text-blue-600">
                ${totalMonthlyCost.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Annual Cost</p>
              <p className="text-lg font-semibold text-gray-800">
                ${(totalMonthlyCost * 12).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {TECH_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const categoryTools = currentTools[category.id] || [];
            const isExpanded = expandedCategories.includes(category.id);

            return (
              <Card key={category.id} className="overflow-hidden">
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-blue-500" />
                      <h3 className="font-semibold">{category.name}</h3>
                      {categoryTools.length > 0 && (
                        <Badge variant="secondary">
                          {categoryTools.length} tool{categoryTools.length > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {categoryTools.length > 0 && (
                        <span className="text-sm font-medium text-gray-600">
                          ${categoryTools.reduce((sum, tool) => sum + tool.monthlyCost, 0)}/mo
                        </span>
                      )}
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="border-t"
                  >
                    <div className="p-4 space-y-4 bg-gray-50/50">
                      {categoryTools.map((tool, index) => (
                        <Card key={index} className="p-4 bg-white">
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="md:col-span-1">
                                <Label>Tool Name</Label>
                                <Input
                                  placeholder="e.g., Salesforce"
                                  value={tool.name}
                                  onChange={(e) => updateTool(category.id, index, 'name', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>Monthly Cost</Label>
                                <div className="relative mt-1">
                                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <Input
                                    type="number"
                                    placeholder="0"
                                    value={tool.monthlyCost || ''}
                                    onChange={(e) => updateTool(category.id, index, 'monthlyCost', parseFloat(e.target.value) || 0)}
                                    className="pl-8"
                                  />
                                </div>
                              </div>
                              <div>
                                <Label>Satisfaction (1-5)</Label>
                                <div className="flex items-center gap-4 mt-3">
                                  <Star className="w-4 h-4 text-orange-500" />
                                  <Slider
                                    value={[tool.satisfaction]}
                                    onValueChange={(value) => updateTool(category.id, index, 'satisfaction', value[0])}
                                    min={1}
                                    max={5}
                                    step={1}
                                    className="flex-1"
                                  />
                                  <span className="text-sm font-medium w-8 text-center">
                                    {tool.satisfaction}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTool(category.id, index)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </Card>
                      ))}
                      
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => addTool(category.id)}
                        className="w-full border-dashed"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add {category.name} Tool
                      </Button>
                    </div>
                  </motion.div>
                )}
              </Card>
            );
          })}

          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              Continue to Growth Goals
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}