
export interface EmailTemplate {
  subject: string;
  body: string;
}

export const generateServiceEmail = (serviceName: string, userDetails?: { name?: string; company?: string }): EmailTemplate => {
  const adminEmail = 'gfibiongenesis@proton.me';
  const userName = userDetails?.name || '[Your Name]';
  const userCompany = userDetails?.company || '[Your Company]';

  const templates: Record<string, EmailTemplate> = {
    // Business Consulting Services
    'Business Planning': {
      subject: `Business Planning Consultation Request - ${userName}`,
      body: `Dear Gfibion Joseph Mutua,

I hope this email finds you well. I am ${userName} from ${userCompany}, and I am interested in your Business Planning consultation services.

I would like to schedule a consultation to discuss:
- Strategic business planning and roadmap development
- Market analysis and competitive positioning
- Financial projections and business model optimization
- Implementation strategies for our business goals

Our company is looking to enhance our strategic planning capabilities and would greatly benefit from your expertise in transforming business visions into actionable roadmaps.

Could we schedule a consultation at your earliest convenience? I am flexible with timing and can accommodate your schedule.

Please let me know your availability and preferred consultation format (in-person, video call, or phone).

Thank you for your time, and I look forward to hearing from you.

Best regards,
${userName}
${userCompany}
Phone: [Your Phone Number]
Email: [Your Email Address]`
    },

    'Risk Management': {
      subject: `Risk Management Consultation Request - ${userName}`,
      body: `Dear Gfibion Joseph Mutua,

I am ${userName} from ${userCompany}, reaching out to request a consultation regarding your Risk Management services.

Our organization is seeking expert guidance on:
- Comprehensive risk assessment and identification
- Risk mitigation strategies and implementation
- Compliance planning and regulatory adherence
- Crisis management and contingency planning
- Insurance optimization and coverage analysis

We recognize the critical importance of robust risk management in today's business environment and would value your expertise in protecting our investments and operations.

I would appreciate the opportunity to discuss our specific risk management needs and explore how your services can benefit our organization.

Please let me know your availability for a consultation meeting.

Best regards,
${userName}
${userCompany}
Phone: [Your Phone Number]
Email: [Your Email Address]`
    },

    'Financial Consultation': {
      subject: `Financial Consultation Request - ${userName}`,
      body: `Dear Gfibion Joseph Mutua,

I am ${userName} from ${userCompany}, and I would like to request a consultation regarding your Financial Consultation services.

We are specifically interested in discussing:
- Financial planning and cash flow optimization
- Budget management and cost reduction strategies
- Tax planning and optimization
- Investment analysis and financial decision-making
- Financial performance improvement strategies

Our organization is looking to enhance our financial management capabilities and maximize profitability through expert guidance.

Could we schedule a consultation to discuss our financial objectives and how your services can help us achieve them?

I am available at your convenience and look forward to your response.

Best regards,
${userName}
${userCompany}
Phone: [Your Phone Number]
Email: [Your Email Address]`
    },

    'Investment Consultation': {
      subject: `Investment Consultation Request - ${userName}`,
      body: `Dear Gfibion Joseph Mutua,

I am ${userName} from ${userCompany}, writing to request a consultation regarding your Investment Consultation services.

We are seeking expert advice on:
- Investment portfolio analysis and optimization
- Strategic investment planning and diversification
- Due diligence processes and risk assessment
- Market research and investment opportunities
- Wealth building and long-term financial growth strategies

Our goal is to make informed investment decisions that align with our financial objectives and risk tolerance.

I would greatly appreciate the opportunity to discuss our investment goals and explore how your expertise can guide our investment strategy.

Please let me know your availability for a consultation.

Best regards,
${userName}
${userCompany}
Phone: [Your Phone Number]
Email: [Your Email Address]`
    },

    'Business Administration': {
      subject: `Business Administration Consultation Request - ${userName}`,
      body: `Dear Gfibion Joseph Mutua,

I am ${userName} from ${userCompany}, and I would like to schedule a consultation regarding your Business Administration services.

We are interested in discussing:
- Operational process optimization and efficiency improvement
- Team management and organizational development
- Resource planning and allocation strategies
- Performance metrics and KPI development
- Administrative systems and workflow enhancement

Our organization is looking to streamline operations and improve overall business efficiency through expert administrative guidance.

Could we arrange a consultation to discuss how your business administration expertise can benefit our operations?

I look forward to your response and scheduling a meeting at your convenience.

Best regards,
${userName}
${userCompany}
Phone: [Your Phone Number]
Email: [Your Email Address]`
    },

    'Startup Development': {
      subject: `Startup Development Consultation Request - ${userName}`,
      body: `Dear Gfibion Joseph Mutua,

I am ${userName} from ${userCompany}, reaching out to request a consultation regarding your Startup Development services.

We are in the process of launching/scaling our startup and would like to discuss:
- MVP (Minimum Viable Product) development strategy
- Go-to-market planning and execution
- Fundraising support and investor relations
- Growth hacking and scaling strategies
- Business model validation and optimization

As an emerging startup, we recognize the value of expert guidance in navigating the challenges of building and scaling a successful business.

I would appreciate the opportunity to discuss our startup journey and explore how your services can accelerate our growth.

Please let me know your availability for a consultation.

Best regards,
${userName}
${userCompany}
Phone: [Your Phone Number]
Email: [Your Email Address]`
    },

    // ICT Services
    'Web Design': {
      subject: `Web Design Services Inquiry - ${userName}`,
      body: `Dear Gfibion Joseph Mutua,

I am ${userName} from ${userCompany}, and I am interested in your Web Design services.

We are looking for a modern, responsive web design solution that includes:
- Custom UI/UX design that reflects our brand identity
- Responsive design for optimal mobile and desktop experience
- User research and usability optimization
- Brand integration and visual consistency
- Conversion-focused design elements

Our project goals include creating a website that captivates users and drives business results. We would like to discuss our specific requirements and timeline.

Could we schedule a consultation to review our project needs and explore how your web design expertise can bring our vision to life?

Please let me know your availability and preferred communication method.

Best regards,
${userName}
${userCompany}
Phone: [Your Phone Number]
Email: [Your Email Address]
Project Timeline: [Preferred Timeline]`
    },

    'Web & App Development': {
      subject: `Web & App Development Project Inquiry - ${userName}`,
      body: `Dear Gfibion Joseph Mutua,

I am ${userName} from ${userCompany}, writing to inquire about your Web & App Development services.

We are planning a development project that involves:
- Custom web application development
- Mobile app development (iOS/Android)
- Progressive Web App (PWA) solutions
- API integration and backend services
- Full-stack development expertise

Our project requires cutting-edge technology implementation and we are impressed by your development capabilities.

I would like to schedule a consultation to discuss our technical requirements, project scope, and timeline.

Could we arrange a meeting to explore how your development services can bring our project to completion?

Best regards,
${userName}
${userCompany}
Phone: [Your Phone Number]
Email: [Your Email Address]
Project Budget Range: [Budget Range]
Preferred Launch Date: [Target Date]`
    },

    'Algorithm Integration': {
      subject: `Algorithm Integration Services Inquiry - ${userName}`,
      body: `Dear Gfibion Joseph Mutua,

I am ${userName} from ${userCompany}, and I am interested in your Algorithm Integration services.

We are seeking advanced solutions in:
- Machine Learning algorithm implementation
- Data analytics and business intelligence
- Process automation and optimization
- Predictive modeling and forecasting
- AI-driven business process enhancement

Our organization is looking to leverage advanced algorithms to automate and optimize our business processes for improved efficiency and decision-making.

I would appreciate the opportunity to discuss our specific requirements and explore how your algorithm integration expertise can transform our operations.

Please let me know your availability for a technical consultation.

Best regards,
${userName}
${userCompany}
Phone: [Your Phone Number]
Email: [Your Email Address]
Current Systems: [Brief Description]`
    },

    'Cloud Computing Services': {
      subject: `Cloud Computing Services Consultation - ${userName}`,
      body: `Dear Gfibion Joseph Mutua,

I am ${userName} from ${userCompany}, reaching out regarding your Cloud Computing Services.

We are interested in:
- Cloud migration strategy and implementation
- Scalable cloud infrastructure setup
- DevOps implementation and automation
- Cloud security and compliance
- Infrastructure optimization and cost management

Our organization is looking to modernize our IT infrastructure and leverage cloud technologies for improved scalability and efficiency.

Could we schedule a consultation to discuss our cloud requirements and migration strategy?

I look forward to exploring how your cloud expertise can support our digital transformation.

Best regards,
${userName}
${userCompany}
Phone: [Your Phone Number]
Email: [Your Email Address]
Current Infrastructure: [Brief Description]`
    },

    'Computer System Management': {
      subject: `Computer System Management Services Inquiry - ${userName}`,
      body: `Dear Gfibion Joseph Mutua,

I am ${userName} from ${userCompany}, and I would like to inquire about your Computer System Management services.

We require comprehensive IT management including:
- Network infrastructure management and optimization
- System monitoring and performance optimization
- Security audits and vulnerability assessments
- Technical support and maintenance
- IT infrastructure planning and upgrades

Our organization needs reliable IT management to ensure optimal system performance and security.

I would appreciate the opportunity to discuss our IT management needs and explore how your services can support our operations.

Please let me know your availability for a consultation.

Best regards,
${userName}
${userCompany}
Phone: [Your Phone Number]
Email: [Your Email Address]
Current IT Setup: [Brief Description]
Number of Users: [User Count]`
    }
  };

  // Default template for unrecognized services
  const defaultTemplate: EmailTemplate = {
    subject: `Service Consultation Request - ${serviceName} - ${userName}`,
    body: `Dear Gfibion Joseph Mutua,

I am ${userName} from ${userCompany}, and I am interested in your ${serviceName} services.

I would like to schedule a consultation to discuss how your expertise in ${serviceName} can benefit our organization. 

Please let me know your availability for a consultation meeting.

Best regards,
${userName}
${userCompany}
Phone: [Your Phone Number]
Email: [Your Email Address]`
  };

  return templates[serviceName] || defaultTemplate;
};

export const generateMailtoLink = (serviceName: string, userDetails?: { name?: string; company?: string }): string => {
  const adminEmail = 'gfibiongenesis@proton.me';
  const template = generateServiceEmail(serviceName, userDetails);
  
  const mailtoLink = `mailto:${adminEmail}?subject=${encodeURIComponent(template.subject)}&body=${encodeURIComponent(template.body)}`;
  return mailtoLink;
};

export const generateChatMessage = (serviceName: string, userDetails?: { name?: string; company?: string }): string => {
  const userName = userDetails?.name || 'User';
  const userCompany = userDetails?.company || 'their company';

  const chatTemplates: Record<string, string> = {
    'Business Planning': `Hello! I'm ${userName} and I'm interested in Business Planning consultation services. I'd like to discuss strategic planning, market analysis, and creating actionable roadmaps for ${userCompany}. Could we schedule a consultation to explore how your expertise can help transform our business vision into reality?`,
    
    'Risk Management': `Hi! I'm ${userName} from ${userCompany}. We're looking for expert Risk Management consultation to help us identify, assess, and mitigate business risks. I'd appreciate discussing compliance planning, crisis management, and insurance optimization. When would be a good time for a consultation?`,
    
    'Financial Consultation': `Hello! I'm ${userName} and I'm interested in Financial Consultation services. We need guidance on financial planning, budget management, cost optimization, and tax strategy for ${userCompany}. Could we schedule a consultation to discuss our financial objectives?`,
    
    'Investment Consultation': `Hi! I'm ${userName} from ${userCompany}. We're seeking Investment Consultation services for portfolio analysis, strategic investment planning, and wealth building strategies. I'd like to schedule a consultation to discuss our investment goals and risk tolerance.`,
    
    'Business Administration': `Hello! I'm ${userName} and I'm interested in Business Administration consultation. We're looking to streamline operations, improve team management, and optimize resource planning for ${userCompany}. Could we discuss how your administrative expertise can benefit our operations?`,
    
    'Startup Development': `Hi! I'm ${userName} from ${userCompany}. We're a startup looking for development consultation including MVP strategy, go-to-market planning, and growth hacking. I'd appreciate discussing how your startup expertise can accelerate our growth journey.`,
    
    'Web Design': `Hello! I'm ${userName} from ${userCompany}. We're interested in your Web Design services for a modern, responsive website with custom UI/UX design and brand integration. Could we schedule a consultation to discuss our project requirements and timeline?`,
    
    'Web & App Development': `Hi! I'm ${userName} and I'm interested in Web & App Development services. We need custom web applications, mobile app development, and API integration for ${userCompany}. I'd like to discuss our technical requirements and project scope.`,
    
    'Algorithm Integration': `Hello! I'm ${userName} from ${userCompany}. We're looking for Algorithm Integration services including machine learning, data analytics, and process automation. Could we schedule a consultation to discuss how AI solutions can optimize our business processes?`,
    
    'Cloud Computing Services': `Hi! I'm ${userName} and I'm interested in Cloud Computing Services. We need cloud migration, infrastructure setup, and DevOps implementation for ${userCompany}. I'd appreciate discussing our cloud requirements and digital transformation strategy.`,
    
    'Computer System Management': `Hello! I'm ${userName} from ${userCompany}. We need Computer System Management services including network management, security audits, and technical support. Could we schedule a consultation to discuss our IT management needs?`
  };

  return chatTemplates[serviceName] || `Hello! I'm ${userName} and I'm interested in your ${serviceName} services. Could we schedule a consultation to discuss how your expertise can benefit ${userCompany}?`;
};
