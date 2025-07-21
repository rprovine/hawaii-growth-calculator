import type { CalculatorData, CalculationResults } from '@/types/calculator';

export async function sendResultsEmail(
  data: CalculatorData,
  results: CalculationResults,
  trackingId: string
) {
  // In production, you would integrate with an email service like:
  // - SendGrid
  // - AWS SES
  // - Resend
  // - Postmark
  
  // For now, we'll just log the email data
  const emailData = {
    to: data.contactInfo.email,
    subject: `Your Hawaii Business Growth Calculator Results - ${data.companyInfo.companyName}`,
    data: {
      name: `${data.contactInfo.firstName} ${data.contactInfo.lastName}`,
      company: data.companyInfo.companyName,
      monthlyInvestment: results.financials.monthlyInvestment,
      estimatedMonthlySavings: results.financials.estimatedMonthlySavings,
      estimatedAnnualSavings: results.financials.estimatedAnnualSavings,
      paybackPeriod: results.financials.paybackPeriodMonths,
      threeYearROI: results.financials.threeYearROI,
      totalValue: results.financials.totalValue,
      solutionTitle: results.recommendedSolution.title,
      trackingId,
    },
  };
  
  console.log('Email would be sent:', emailData);
  
  // Example email template:
  const emailHtml = `
    <h2>Aloha ${emailData.data.name},</h2>
    
    <p>Thank you for using the Hawaii Business Growth Calculator! Based on your assessment, we've identified significant opportunities to transform your business.</p>
    
    <h3>Your Personalized Results:</h3>
    
    <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Recommended Solution:</strong></td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${emailData.data.solutionTitle}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Monthly Investment:</strong></td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">$${emailData.data.monthlyInvestment.toLocaleString()}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Estimated Monthly Savings:</strong></td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">$${emailData.data.estimatedMonthlySavings.toLocaleString()}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Annual Savings:</strong></td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">$${emailData.data.estimatedAnnualSavings.toLocaleString()}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Payback Period:</strong></td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${emailData.data.paybackPeriod} months</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>3-Year ROI:</strong></td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${emailData.data.threeYearROI}%</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Total 3-Year Value:</strong></td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">$${emailData.data.totalValue.toLocaleString()}</td>
      </tr>
    </table>
    
    <h3>Next Steps:</h3>
    <ol>
      <li>Schedule a free consultation to discuss your results in detail</li>
      <li>Get a customized implementation roadmap for your business</li>
      <li>Learn about available incentives and financing options</li>
    </ol>
    
    <p style="margin-top: 30px;">
      <a href="https://hawaii.lenilani.com/schedule?ref=${trackingId}" 
         style="background-color: #0066CC; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Schedule Your Free Consultation
      </a>
    </p>
    
    <p style="margin-top: 30px; font-size: 14px; color: #666;">
      Reference ID: ${trackingId}<br>
      LeniLani Consulting - Hawaii's Premier AI & Technology Partner
    </p>
  `;
  
  // TODO: Implement actual email sending
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'calculator@lenilani.com',
  //   to: emailData.to,
  //   subject: emailData.subject,
  //   html: emailHtml,
  // });
  
  return { success: true, emailData };
}