import { Globe, Truck, Award, Users } from 'lucide-react';

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  icon: any;
  featured: boolean;
  image: string;
  author: string;
  readTime: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    slug: 'expansion-25-new-countries',
    title: 'CMC Logistics Expands Operations to 25 New Countries',
    excerpt: 'We are excited to announce our expansion into 25 new markets across Africa, Asia, and South America, bringing our total coverage to 160+ countries worldwide.',
    content: `
      <p>We are thrilled to announce a major milestone in CMC Logistics' global expansion strategy. As of March 2024, we have successfully extended our logistics network to cover 25 additional countries across Africa, Asia, and South America.</p>
      
      <h2>Expanding Our Global Reach</h2>
      <p>This strategic expansion brings our total international coverage to over 160 countries, reinforcing our commitment to providing truly global logistics solutions. Our new markets include key economic hubs in:</p>
      
      <ul>
        <li><strong>Africa:</strong> Nigeria, Kenya, South Africa, Ghana, Egypt, Morocco, Tanzania, Uganda, and Ethiopia</li>
        <li><strong>Asia:</strong> Vietnam, Thailand, Indonesia, Philippines, Malaysia, Bangladesh, and Pakistan</li>
        <li><strong>South America:</strong> Colombia, Peru, Chile, Argentina, Uruguay, Paraguay, Bolivia, and Ecuador</li>
      </ul>
      
      <h2>Enhanced Services and Infrastructure</h2>
      <p>To support this expansion, we have invested $50 million in new infrastructure, including:</p>
      
      <ul>
        <li>12 new distribution centers strategically located across the regions</li>
        <li>Advanced tracking and monitoring systems for real-time shipment visibility</li>
        <li>Local customs clearance expertise in each new market</li>
        <li>Multilingual customer support teams available 24/7</li>
      </ul>
      
      <h2>Commitment to Quality Service</h2>
      <p>"This expansion represents our dedication to meeting the evolving needs of our global customer base," says Sarah Johnson, CEO of CMC Logistics. "We're not just adding countries to our map; we're building relationships, creating jobs, and contributing to the economic growth of these regions."</p>
      
      <p>All new markets will benefit from our full suite of services, including air freight, sea freight, road transportation, warehousing, and customs brokerage.</p>
      
      <h2>What This Means for Our Customers</h2>
      <p>Our customers can now:</p>
      <ul>
        <li>Ship to more destinations with a single trusted partner</li>
        <li>Enjoy competitive pricing through our expanded network</li>
        <li>Benefit from local expertise and cultural knowledge</li>
        <li>Track shipments seamlessly across borders</li>
        <li>Access dedicated support in local languages</li>
      </ul>
      
      <p>We look forward to serving you in these exciting new markets and continuing our mission to connect the world through reliable, efficient logistics solutions.</p>
    `,
    date: '2024-03-15',
    category: 'Expansion',
    icon: Globe,
    featured: true,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop',
    author: 'Sarah Johnson, CEO',
    readTime: '5 min read'
  },
  {
    id: 2,
    slug: 'ai-route-optimization',
    title: 'New AI-Powered Route Optimization System',
    excerpt: 'Our latest technology upgrade includes machine learning algorithms that optimize delivery routes in real-time, reducing transit times by up to 30%.',
    content: `
      <p>CMC Logistics is proud to announce the launch of our revolutionary AI-powered route optimization system, marking a significant leap forward in logistics technology and efficiency.</p>
      
      <h2>The Technology Behind the Innovation</h2>
      <p>Our new system leverages advanced machine learning algorithms and real-time data analytics to optimize delivery routes dynamically. By analyzing millions of data points including traffic patterns, weather conditions, road closures, and historical delivery performance, the system can predict the most efficient routes with unprecedented accuracy.</p>
      
      <h2>Key Features and Benefits</h2>
      <ul>
        <li><strong>Real-Time Route Adjustments:</strong> The system continuously monitors conditions and automatically reroutes vehicles to avoid delays</li>
        <li><strong>Fuel Efficiency:</strong> Optimized routes reduce fuel consumption by an average of 20%, supporting our sustainability goals</li>
        <li><strong>Faster Deliveries:</strong> Transit times have been reduced by up to 30% on major routes</li>
        <li><strong>Improved Accuracy:</strong> Delivery time predictions are now 95% accurate within a 30-minute window</li>
        <li><strong>Cost Savings:</strong> Operating efficiency improvements translate to more competitive pricing for customers</li>
      </ul>
      
      <h2>Environmental Impact</h2>
      <p>Beyond efficiency gains, this technology significantly reduces our carbon footprint. The optimized routing means fewer miles driven, less fuel consumed, and reduced emissions. We estimate this system will prevent over 5,000 tons of CO2 emissions annually.</p>
      
      <h2>Looking to the Future</h2>
      <p>"This is just the beginning," explains Michael Chen, our Chief Technology Officer. "We're continuously training our AI models with new data, and we're already working on integrating predictive maintenance and autonomous vehicle routing capabilities."</p>
      
      <p>The system has been rolled out across our entire North American network and will be expanded to our European and Asian operations by Q3 2024.</p>
      
      <h2>Customer Impact</h2>
      <p>Customers using our tracking portal can now see enhanced delivery predictions and receive proactive notifications about any potential delays. The system also enables us to offer guaranteed delivery windows with greater confidence.</p>
    `,
    date: '2024-03-10',
    category: 'Technology',
    icon: Truck,
    featured: true,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
    author: 'Michael Chen, CTO',
    readTime: '6 min read'
  },
  {
    id: 3,
    slug: 'iso-27001-certification',
    title: 'CMC Logistics Receives ISO 27001 Certification',
    excerpt: 'We have achieved ISO 27001 certification for information security management, demonstrating our commitment to protecting customer data.',
    content: `
      <p>CMC Logistics is pleased to announce that we have successfully achieved ISO 27001:2022 certification, the international standard for information security management systems (ISMS).</p>
      
      <h2>What is ISO 27001?</h2>
      <p>ISO 27001 is the world's most recognized information security standard. It provides a framework for implementing, maintaining, and continually improving an information security management system. This certification demonstrates our commitment to protecting sensitive customer information and maintaining the highest standards of data security.</p>
      
      <h2>Why This Matters</h2>
      <p>In an era where data breaches and cyber threats are increasingly common, this certification provides our customers with confidence that their information is protected by industry-leading security practices. The certification covers:</p>
      
      <ul>
        <li>Customer data protection and privacy</li>
        <li>Shipment tracking information security</li>
        <li>Payment processing and financial data</li>
        <li>Employee information systems</li>
        <li>Business continuity and disaster recovery</li>
      </ul>
      
      <h2>Our Security Measures</h2>
      <p>Achieving this certification required a comprehensive audit of our security practices, including:</p>
      
      <ul>
        <li>Multi-factor authentication for all system access</li>
        <li>End-to-end encryption for data transmission</li>
        <li>Regular security audits and penetration testing</li>
        <li>Employee security awareness training</li>
        <li>Incident response and management procedures</li>
        <li>Regular backup and recovery testing</li>
      </ul>
      
      <h2>Continuous Improvement</h2>
      <p>"ISO 27001 certification is not a one-time achievement but an ongoing commitment to security excellence," states our Security Team Lead. "We undergo regular surveillance audits to ensure we maintain compliance and continue to improve our security posture."</p>
      
      <h2>Customer Benefits</h2>
      <p>Our customers can trust that:</p>
      <ul>
        <li>Their shipment data is protected with bank-level security</li>
        <li>Personal and payment information is encrypted and secure</li>
        <li>We have robust systems to prevent unauthorized access</li>
        <li>Business continuity is maintained even during disruptions</li>
        <li>We comply with international data protection regulations</li>
      </ul>
      
      <p>This certification joins our existing IATA accreditation and demonstrates our commitment to maintaining the highest standards across all aspects of our operations.</p>
    `,
    date: '2024-03-05',
    category: 'Certification',
    icon: Award,
    featured: false,
    image: 'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=1200&h=600&fit=crop',
    author: 'Security Team',
    readTime: '4 min read'
  },
  {
    id: 4,
    slug: 'ecommerce-partnerships',
    title: 'Partnership with Major E-commerce Platforms',
    excerpt: 'New integrations with leading e-commerce platforms make it easier than ever for online retailers to manage their shipping needs.',
    content: `
      <p>CMC Logistics is excited to announce strategic partnerships with major e-commerce platforms, including Shopify, WooCommerce, Magento, and BigCommerce. These integrations will streamline shipping operations for thousands of online retailers worldwide.</p>
      
      <h2>Seamless Integration</h2>
      <p>Our new e-commerce integrations provide one-click shipping solutions that automatically sync orders, generate shipping labels, and update tracking information in real-time. This eliminates manual data entry and reduces the risk of errors.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li><strong>Automatic Order Sync:</strong> Orders are automatically imported from your e-commerce platform</li>
        <li><strong>Real-Time Rate Calculation:</strong> Show accurate shipping costs to customers at checkout</li>
        <li><strong>Bulk Label Printing:</strong> Process hundreds of orders with just a few clicks</li>
        <li><strong>Automated Tracking Updates:</strong> Customers receive automatic tracking notifications</li>
        <li><strong>Returns Management:</strong> Simplified return label generation and processing</li>
        <li><strong>Analytics Dashboard:</strong> Comprehensive shipping analytics and reporting</li>
      </ul>
      
      <h2>Benefits for Online Retailers</h2>
      <p>E-commerce businesses using our integration can expect:</p>
      
      <ul>
        <li>Up to 75% reduction in time spent on shipping operations</li>
        <li>Access to discounted shipping rates through our global network</li>
        <li>Improved customer satisfaction with faster processing times</li>
        <li>Better inventory management with real-time synchronization</li>
        <li>Reduced shipping errors and customer service inquiries</li>
      </ul>
      
      <h2>Special Launch Offer</h2>
      <p>To celebrate these new partnerships, we're offering special promotional rates for e-commerce businesses:</p>
      <ul>
        <li>20% off domestic shipping for the first 3 months</li>
        <li>Free integration setup and onboarding</li>
        <li>Dedicated e-commerce support specialist</li>
        <li>Access to our premium tracking portal</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>"We've made the integration process as simple as possible," explains our Business Development Director. "Most merchants can be up and running in less than 15 minutes. Our step-by-step guides and video tutorials walk you through every aspect of the setup."</p>
      
      <p>The integration supports all our shipping services including expedited shipping, international delivery, signature confirmation, and package insurance.</p>
      
      <h2>Customer Success Stories</h2>
      <p>Early adopters of our e-commerce integrations have reported remarkable results:</p>
      <ul>
        <li>A fashion retailer processed 40% more orders without adding staff</li>
        <li>An electronics merchant reduced shipping errors by 85%</li>
        <li>A home goods store cut shipping costs by 30% through optimized carrier selection</li>
      </ul>
      
      <p>Visit our website to learn more about our e-commerce integrations or contact our team to schedule a demo.</p>
    `,
    date: '2024-02-28',
    category: 'Partnership',
    icon: Users,
    featured: false,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
    author: 'Business Development',
    readTime: '5 min read'
  },
  {
    id: 5,
    slug: 'sustainable-packaging',
    title: 'Sustainable Packaging Initiative Launch',
    excerpt: 'Introducing our eco-friendly packaging solutions to reduce environmental impact while maintaining the highest protection standards.',
    content: `
      <p>CMC Logistics is proud to launch our comprehensive Sustainable Packaging Initiative, a major step forward in our commitment to environmental responsibility and reducing our carbon footprint.</p>
      
      <h2>The Environmental Challenge</h2>
      <p>The logistics industry generates millions of tons of packaging waste annually. As a leader in global shipping, we recognize our responsibility to address this challenge and provide sustainable alternatives that don't compromise on package protection.</p>
      
      <h2>Our Sustainable Solutions</h2>
      <p>We've developed a complete line of eco-friendly packaging options:</p>
      
      <ul>
        <li><strong>100% Recycled Cardboard Boxes:</strong> Made from post-consumer waste with full recyclability</li>
        <li><strong>Biodegradable Cushioning:</strong> Plant-based protective materials that decompose naturally</li>
        <li><strong>Recycled Paper Tape:</strong> Replacing plastic tape with paper alternatives</li>
        <li><strong>Compostable Mailers:</strong> For lightweight items, made from cornstarch</li>
        <li><strong>Reusable Shipping Containers:</strong> Durable containers for regular shipments</li>
      </ul>
      
      <h2>Environmental Impact</h2>
      <p>Our sustainable packaging program is projected to:</p>
      <ul>
        <li>Eliminate 500 tons of plastic waste annually</li>
        <li>Reduce packaging-related CO2 emissions by 40%</li>
        <li>Divert 10,000 tons of material from landfills</li>
        <li>Save 2 million gallons of water in production</li>
      </ul>
      
      <h2>No Compromise on Protection</h2>
      <p>We've rigorously tested all our sustainable packaging solutions to ensure they meet or exceed traditional packaging in terms of:</p>
      <ul>
        <li>Impact resistance and cushioning</li>
        <li>Moisture protection</li>
        <li>Stacking strength</li>
        <li>Temperature resistance</li>
      </ul>
      
      <h2>Customer Participation</h2>
      <p>Customers can choose sustainable packaging options at no additional cost when creating shipments. We also offer a packaging return program where customers can send back our reusable containers for credit.</p>
      
      <h2>Industry Leadership</h2>
      <p>"This initiative positions CMC Logistics as an environmental leader in the logistics sector," states our Environmental Team Lead. "We're proving that sustainability and efficiency can go hand in hand."</p>
      
      <h2>Looking Forward</h2>
      <p>This is phase one of our sustainability roadmap. Upcoming initiatives include:</p>
      <ul>
        <li>Carbon-neutral shipping options</li>
        <li>Electric delivery vehicle fleet expansion</li>
        <li>Solar-powered distribution centers</li>
        <li>Packaging take-back and recycling programs</li>
      </ul>
      
      <p>Together with our customers, we're working toward a more sustainable future for global logistics.</p>
    `,
    date: '2024-02-20',
    category: 'Sustainability',
    icon: Globe,
    featured: false,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&h=600&fit=crop',
    author: 'Environmental Team',
    readTime: '5 min read'
  },
  {
    id: 6,
    slug: '24-7-customer-support',
    title: '24/7 Customer Support Now Available',
    excerpt: 'Our customer support team is now available around the clock to assist with tracking, claims, and general inquiries in multiple languages.',
    content: `
      <p>CMC Logistics is excited to announce the launch of our 24/7 customer support service, providing round-the-clock assistance to our global customer base in multiple languages.</p>
      
      <h2>Always Here When You Need Us</h2>
      <p>We understand that logistics challenges don't follow a 9-to-5 schedule. Whether you're shipping internationally across time zones or dealing with an urgent delivery issue, our team is now available any time, any day of the year.</p>
      
      <h2>Multilingual Support</h2>
      <p>Our global support team provides assistance in 15 languages:</p>
      <ul>
        <li>English, Spanish, French, German, Italian</li>
        <li>Mandarin, Cantonese, Japanese, Korean</li>
        <li>Arabic, Portuguese, Russian, Hindi</li>
        <li>Dutch, and Polish</li>
      </ul>
      
      <h2>Multiple Support Channels</h2>
      <p>Reach us through your preferred communication method:</p>
      
      <ul>
        <li><strong>Live Chat:</strong> Instant messaging with support agents through our website</li>
        <li><strong>Phone Support:</strong> Direct lines to regional support centers</li>
        <li><strong>Email Support:</strong> Detailed responses within 2 hours</li>
        <li><strong>Social Media:</strong> Support via Twitter, Facebook, and LinkedIn</li>
        <li><strong>Video Call:</strong> Screen-sharing for complex issues</li>
      </ul>
      
      <h2>Specialized Support Teams</h2>
      <p>Our support structure includes specialized teams for:</p>
      
      <ul>
        <li><strong>Tracking Assistance:</strong> Real-time shipment location updates</li>
        <li><strong>Claims Processing:</strong> Dedicated team for damage or loss claims</li>
        <li><strong>Customs Support:</strong> Expert guidance on international shipping documentation</li>
        <li><strong>Technical Support:</strong> Help with our shipping platform and integrations</li>
        <li><strong>Account Management:</strong> Billing inquiries and account updates</li>
      </ul>
      
      <h2>Enhanced Technology</h2>
      <p>We've invested in cutting-edge support technology including:</p>
      
      <ul>
        <li>AI-powered chatbot for instant answers to common questions</li>
        <li>Screen-sharing capabilities for troubleshooting</li>
        <li>Unified customer profile for seamless handoffs between agents</li>
        <li>Proactive notification system for shipment issues</li>
        <li>Knowledge base with 500+ self-service articles</li>
      </ul>
      
      <h2>Average Response Times</h2>
      <p>Our commitment to fast response includes:</p>
      <ul>
        <li>Live Chat: Under 60 seconds</li>
        <li>Phone: Under 90 seconds</li>
        <li>Email: Within 2 hours</li>
        <li>Social Media: Within 30 minutes</li>
      </ul>
      
      <h2>Customer Feedback</h2>
      <p>"The 24/7 support has been a game-changer for our international operations," says a long-time customer. "Being able to get help at 2 AM when a shipment is delayed has saved us countless times."</p>
      
      <h2>Continuous Training</h2>
      <p>Our support team undergoes regular training on:</p>
      <ul>
        <li>New shipping regulations and customs procedures</li>
        <li>Product updates and new features</li>
        <li>Customer service best practices</li>
        <li>Cultural awareness and sensitivity</li>
        <li>Crisis management and escalation procedures</li>
      </ul>
      
      <p>Contact us anytime through your preferred channel - we're always here to help ensure your shipping experience is smooth and stress-free.</p>
    `,
    date: '2024-02-15',
    category: 'Service',
    icon: Users,
    featured: false,
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=600&fit=crop',
    author: 'Customer Success',
    readTime: '4 min read'
  }
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find(article => article.slug === slug);
}

export function getFeaturedArticles(): NewsArticle[] {
  return newsArticles.filter(article => article.featured);
}

export function getRegularArticles(): NewsArticle[] {
  return newsArticles.filter(article => !article.featured);
}
