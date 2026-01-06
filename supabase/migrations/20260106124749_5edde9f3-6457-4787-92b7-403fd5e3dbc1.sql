-- Insert service categories
INSERT INTO service_categories (name, slug, description) VALUES 
('Business Management', 'business-management', 'Strategic solutions for organizational growth, operational excellence, and sustainable success.'),
('ICT & Technology', 'ict-technology', 'Cutting-edge technology integration for digital transformation and innovation.');

-- Insert Business Management Services
INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Business Strategy Consulting',
  'Comprehensive strategic planning and business development guidance to help you achieve your goals and maximize growth potential.',
  'target',
  sc.id,
  true,
  '$2,000 - $15,000',
  ARRAY['Strategic Planning', 'Growth Strategy', 'Market Positioning', 'Competitive Advantage'],
  true
FROM service_categories sc WHERE sc.slug = 'business-management';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Financial Planning & Budgeting',
  'Expert financial planning, budgeting, and forecasting services to ensure sustainable business growth and profitability.',
  'dollar-sign',
  sc.id,
  true,
  '$1,500 - $12,000',
  ARRAY['Budget Planning', 'Financial Forecasting', 'Cash Flow Management', 'Investment Planning'],
  true
FROM service_categories sc WHERE sc.slug = 'business-management';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Business Registration & Compliance',
  'Complete business registration services and ongoing compliance management to keep your business legally sound.',
  'shield',
  sc.id,
  false,
  '$500 - $3,000',
  ARRAY['Business Registration', 'Regulatory Compliance', 'Legal Documentation', 'Licensing Support'],
  true
FROM service_categories sc WHERE sc.slug = 'business-management';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Market Research & Competitive Analysis',
  'In-depth market research and competitive analysis to inform your business decisions and identify opportunities.',
  'search',
  sc.id,
  true,
  '$1,000 - $8,000',
  ARRAY['Market Analysis', 'Competitor Research', 'Industry Insights', 'Opportunity Assessment'],
  true
FROM service_categories sc WHERE sc.slug = 'business-management';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Proposal & Report Writing',
  'Professional proposal and report writing services to help you win contracts and communicate effectively.',
  'file-text',
  sc.id,
  false,
  '$300 - $2,500',
  ARRAY['Business Proposals', 'Technical Reports', 'Grant Applications', 'Documentation'],
  true
FROM service_categories sc WHERE sc.slug = 'business-management';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Client & Supplier Relations',
  'Develop and maintain strong relationships with clients and suppliers to drive business success and sustainability.',
  'handshake',
  sc.id,
  false,
  '$1,200 - $8,000',
  ARRAY['Relationship Management', 'Communication Strategy', 'Partnership Development', 'Vendor Management'],
  true
FROM service_categories sc WHERE sc.slug = 'business-management';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Business Process Improvement',
  'Optimize your business processes to increase efficiency, reduce costs, and improve overall performance.',
  'refresh-cw',
  sc.id,
  true,
  '$2,000 - $15,000',
  ARRAY['Process Analysis', 'Workflow Optimization', 'Efficiency Improvement', 'Quality Management'],
  true
FROM service_categories sc WHERE sc.slug = 'business-management';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Branding & Corporate Identity',
  'Create a strong brand identity and corporate image that resonates with your target audience and differentiates you from competitors.',
  'award',
  sc.id,
  false,
  '$1,500 - $10,000',
  ARRAY['Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Brand Positioning'],
  true
FROM service_categories sc WHERE sc.slug = 'business-management';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Digital Marketing Strategy',
  'Comprehensive digital marketing strategies to increase your online presence and reach your target audience effectively.',
  'trending-up',
  sc.id,
  true,
  '$2,000 - $12,000',
  ARRAY['SEO Strategy', 'Social Media Marketing', 'Content Marketing', 'Digital Advertising'],
  true
FROM service_categories sc WHERE sc.slug = 'business-management';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Project Management & Execution',
  'Professional project management services to ensure your projects are completed on time, within budget, and to specification.',
  'briefcase',
  sc.id,
  false,
  '$2,500 - $18,000',
  ARRAY['Project Planning', 'Resource Management', 'Timeline Management', 'Quality Assurance'],
  true
FROM service_categories sc WHERE sc.slug = 'business-management';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Guidance and Counseling Services',
  'Professional peer counseling and guidance services providing personalized support for personal development, career guidance, and life transitions.',
  'heart-handshake',
  sc.id,
  true,
  '$800 - $5,000',
  ARRAY['Peer Counseling', 'Career Guidance', 'Personal Development', 'Life Coaching'],
  true
FROM service_categories sc WHERE sc.slug = 'business-management';

-- Insert ICT & Technology Services
INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Web Design & Deployment',
  'Modern, responsive web design and deployment services using cutting-edge platforms like Vercel, GitHub, and WordPress.',
  'monitor',
  sc.id,
  true,
  '$2,000 - $15,000',
  ARRAY['Responsive Design', 'Vercel Deployment', 'GitHub Integration', 'WordPress Development'],
  true
FROM service_categories sc WHERE sc.slug = 'ict-technology';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Business Systems Integration',
  'Seamless integration of business systems including CRM, ERP, and POS setup to streamline your operations.',
  'layers',
  sc.id,
  true,
  '$3,000 - $25,000',
  ARRAY['CRM Setup', 'ERP Integration', 'POS Systems', 'Data Synchronization'],
  true
FROM service_categories sc WHERE sc.slug = 'ict-technology';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Workflow Automation',
  'Automate repetitive tasks and workflows using powerful platforms like Zapier, n8n, and Make.com to boost productivity.',
  'zap',
  sc.id,
  true,
  '$1,500 - $12,000',
  ARRAY['Zapier Integration', 'Process Automation', 'Workflow Design', 'Productivity Tools'],
  true
FROM service_categories sc WHERE sc.slug = 'ict-technology';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'API Integration & Backend Services',
  'Expert API integration and backend development using modern platforms like Firebase and Supabase for robust applications.',
  'plug',
  sc.id,
  false,
  '$2,500 - $20,000',
  ARRAY['API Development', 'Firebase Setup', 'Supabase Integration', 'Backend Architecture'],
  true
FROM service_categories sc WHERE sc.slug = 'ict-technology';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Cloud Services & File Management',
  'Comprehensive cloud solutions and file management systems using Google Workspace, OneDrive, and other cloud platforms.',
  'cloud',
  sc.id,
  false,
  '$1,000 - $8,000',
  ARRAY['Google Workspace', 'OneDrive Setup', 'Cloud Storage', 'File Management'],
  true
FROM service_categories sc WHERE sc.slug = 'ict-technology';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Internal Dashboards & Client Portals',
  'Custom dashboards and client portals to provide real-time insights and improve client communication and engagement.',
  'bar-chart',
  sc.id,
  true,
  '$3,000 - $18,000',
  ARRAY['Custom Dashboards', 'Client Portals', 'Data Visualization', 'Real-time Analytics'],
  true
FROM service_categories sc WHERE sc.slug = 'ict-technology';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Cybersecurity Setup for SMEs',
  'Comprehensive cybersecurity solutions designed specifically for small and medium enterprises to protect your digital assets.',
  'shield-check',
  sc.id,
  false,
  '$2,000 - $15,000',
  ARRAY['Security Assessment', 'Data Protection', 'Network Security', 'Compliance Standards'],
  true
FROM service_categories sc WHERE sc.slug = 'ict-technology';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Data Analytics & Visualization',
  'Transform your data into actionable insights with advanced analytics and visualization tools for informed decision-making.',
  'chart-line',
  sc.id,
  true,
  '$2,500 - $16,000',
  ARRAY['Data Analysis', 'Business Intelligence', 'Custom Reports', 'Predictive Analytics'],
  true
FROM service_categories sc WHERE sc.slug = 'ict-technology';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'Staff ICT Training & Tech Policy Setup',
  'Comprehensive ICT training programs and technology policy development to empower your team and ensure best practices.',
  'users',
  sc.id,
  false,
  '$1,200 - $8,000',
  ARRAY['Technical Training', 'Policy Development', 'Best Practices', 'Skills Development'],
  true
FROM service_categories sc WHERE sc.slug = 'ict-technology';

INSERT INTO services (title, description, icon, category_id, featured, price_range, tags, active)
SELECT 
  'IT Support & Infrastructure for Businesses',
  'Reliable IT support and infrastructure services to keep your business running smoothly with minimal downtime.',
  'server',
  sc.id,
  false,
  '$1,500 - $10,000',
  ARRAY['IT Support', 'Infrastructure Setup', 'Network Management', 'System Maintenance'],
  true
FROM service_categories sc WHERE sc.slug = 'ict-technology';