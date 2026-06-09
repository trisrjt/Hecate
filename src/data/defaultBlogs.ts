export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  read_time: string;
  published_at: string;
}

export const defaultBlogs: BlogPostItem[] = [
  {
    id: 'seed-blog-1',
    title: '5 Tips to Design a Modular Kitchen for Indian Homes',
    slug: 'modular-kitchen-design-indian-homes',
    category: 'Modular Kitchen',
    author: 'Hecate Kitchen Expert',
    read_time: '4 min read',
    published_at: '2026-06-01T10:00:00.000Z',
    image: '/images/service-kitchen.jpg',
    excerpt: 'Designing a kitchen in India requires a balance of space, humidity control, and accessibility. Here are 5 expert tips to get it right.',
    content: `<h3><strong>Understanding the Indian Culinary Workspace</strong></h3>
<p>Indian cooking is distinct, vibrant, and involves unique elements: heavy spices, high heat, deep frying, and a lot of prep work. Therefore, designing a modular kitchen for an Indian household is not just about aesthetics—it requires careful planning of storage, ventilation, and material selection.</p>
<p>Here are 5 design secrets and layouts tailored specifically to Indian culinary habits.</p>

<hr />

<h3><strong>1. The Golden Triangle Rule (Ergonomic Workflow)</strong></h3>
<p>The core of every functional kitchen layout is the **Work Triangle**, which connects the three most vital workspaces:</p>
<ul>
  <li><strong>The Sink</strong> (Cleaning)</li>
  <li><strong>The Refrigerator</strong> (Storage)</li>
  <li><strong>The Hob/Stove</strong> (Cooking)</li>
</ul>
<p>To ensure a seamless workflow, the distance between these elements should be between 4 and 9 feet. In Indian homes where multiple family members often cook together, a parallel or L-shaped layout works best to accommodate joint prep and cooking sessions without crowding.</p>

<h3><strong>2. Select High-Quality, Heavy-Duty Materials</strong></h3>
<p>Because Indian cooking generates substantial moisture, heat, and oil residue, standard MDF or particle boards tend to warp or rot quickly. Instead, always opt for:</p>
<ul>
  <li><strong>BWP (Boiling Water Proof) Plywood</strong>: Ideal for the sink area and wet zones.</li>
  <li><strong>High-Density High-Moisture Resistant (HDHMR) Boards</strong>: Excellent durability for cabinets and heavy storage areas.</li>
  <li><strong>Acro-Laminates or Premium Acrylic finishes</strong>: They are heat-resistant, easy to wipe down, and don't stain easily.</li>
</ul>

<h3><strong>3. Invest in High-Capacity Ventilation</strong></h3>
<p>Cooking with oil, turmeric, and strong spices can leave long-lasting odors and greasy film deposits on kitchen surfaces. A standard exhaust fan is rarely enough. Install a high-suction **electric chimney** (at least 1200 m³/hr capacity) directly above your hob. Make sure it is positioned at an ergonomic height—roughly 26 to 30 inches above the stove—to maximize suction efficiency.</p>

<h3><strong>4. Tailored Storage: Tandem Drawers vs. Deep Cabinets</strong></h3>
<p>Traditional Indian kitchens hold a huge variety of spices, massive flour containers (Atta jars), heavy stainless steel pans (Kadais), and bulk grocery packets. To manage this:</p>
<ul>
  <li>Replace low-level shelves with deep **tandem drawers** and pull-out baskets. They allow you to access heavy pots at the back easily.</li>
  <li>Integrate a **vertical pantry unit** for tall grocery jars.</li>
  <li>Install dedicated **pull-out spice racks** next to the stove for quick access.</li>
</ul>

<h3><strong>5. Practical Countertop Selections</strong></h3>
<p>Indian countertops are subjected to lemon juice, vinegar, hot pots, and aggressive pounding. Avoid white marble or light-colored quartz that stain easily from turmeric. Instead, select:</p>
<ul>
  <li><strong>Premium Granite</strong>: Practically indestructible, scratch-resistant, and stain-proof.</li>
  <li><strong>Engineered Quartz</strong>: Hard, non-porous, and available in uniform, dark, premium patterns that hide dust and spills.</li>
</ul>
<p>Following these rules will help you create a beautiful modular kitchen that stands the test of time, keeping its brand-new shine for decades.</p>`
  },
  {
    id: 'seed-blog-2',
    title: 'Why Ergonomics Matter in Modern Office Furniture',
    slug: 'importance-ergonomics-office-furniture',
    category: 'Office Space',
    author: 'Hecate Design Team',
    read_time: '5 min read',
    published_at: '2026-06-03T11:30:00.000Z',
    image: '/images/service-office.jpg',
    excerpt: 'Long hours at a desk can cause chronic pain and fatigue. Learn why investing in ergonomic chairs and height-adjustable desks boosts productivity.',
    content: `<h3><strong>The Hidden Cost of Uncomfortable Workspaces</strong></h3>
<p>According to workspace health studies, a significant portion of physical discomfort and absenteeism in corporate offices stems from poor posture and static seating. When employees sit for 8 to 10 hours a day on non-adjustable chairs, it leads to chronic backaches, repetitive strain injuries (RSI), and general fatigue. This directly reduces productivity and team morale.</p>
<p>Here is why ergonomic office furniture is a high-return investment for modern businesses.</p>

<hr />

<h3><strong>1. What is Ergonomics?</strong></h3>
<p>Ergonomics is the science of designing the workplace environment to fit the user, rather than forcing the user to fit the environment. In office design, this translates to furniture that can be adjusted to support the natural curve of the spine, reduce joint stress, and promote micro-movements throughout the workday.</p>

<h3><strong>2. Key Components of Ergonomic Office Furniture</strong></h3>
<p>To establish a healthy work environment, look for these vital elements:</p>
<ul>
  <li><strong>Adjustable Lumbar Support</strong>: A chair should mimic the natural "S" curve of the spine. Adjustable support prevents lower-back slouching.</li>
  <li><strong>Height-Adjustable Desks</strong>: Alternating between sitting and standing (sit-stand desks) improves circulation, burns calories, and relieves spinal pressure.</li>
  <li><strong>Adjustable Armrests</strong>: Armrests should allow elbows to rest comfortably at a 90-degree angle, preventing shoulder tension.</li>
  <li><strong>Swivel & Castor mobility</strong>: Easy movement avoids strain when reaching for items across the desk.</li>
</ul>

<h3><strong>3. Boosting Productivity and Focus</strong></h3>
<p>It is difficult to focus when dealing with physical pain. Ergonomic seating reduces physical distractions. When employees are comfortable, they experience higher energy levels, sustain focus for longer periods, and produce higher-quality output. Proper furniture is a major pillar of workspace wellness.</p>

<h3><strong>4. Long-Term Health Benefits</strong></h3>
<p>Investing in ergonomics reduces the risk of long-term musculoskeletal disorders (MSDs). Over time, this lowers healthcare costs, minimizes employee absenteeism, and builds a positive, health-conscious office culture that attracts top talent.</p>
<p>When planning your next office fit-out, remember: comfort is not a luxury, it is a business performance strategy.</p>`
  },
  {
    id: 'seed-blog-3',
    title: 'The Rise of Co-working Spaces: Designing for Collaboration',
    slug: 'designing-collaborative-coworking-spaces',
    category: 'Interior Trends',
    author: 'Hecate Lead Architect',
    read_time: '6 min read',
    published_at: '2026-06-05T09:15:00.000Z',
    image: '/images/project-collab.jpg',
    excerpt: 'Modern workplaces are shifting from cubicles to collaboration hubs. Discover how modular furniture drives creativity in modern co-working hubs.',
    content: `<h3><strong>The Evolution of the Shared Workspace</strong></h3>
<p>Co-working spaces have transformed from temporary startup offices into hubs of innovation, networking, and creative thinking. Designing a co-working space is drastically different from setting up a traditional corporate office. It requires a layout that accommodates diverse working styles, supports networking, and allows fast reconfiguration.</p>
<p>Let's look at the key design pillars that make shared workspaces successful.</p>

<hr />

<h3><strong>1. The Balance of Focus and Collaboration</strong></h3>
<p>A successful co-working layout offers zoning options:</p>
<ul>
  <li><strong>Hot Desks & Open Benches</strong>: Active, high-energy areas for collaboration, laptop work, and brainstorming.</li>
  <li><strong>Private Phone Booths</strong>: Acoustic, sound-insulated single compartments for quiet calls and online meetings.</li>
  <li><strong>Quiet Focus Zones</strong>: Areas structured with physical divider screens or acoustic partitions to minimize distractions.</li>
  <li><strong>Lounges & Cafes</strong>: Casual settings with cozy couches and side tables for networking and relaxed discussions.</li>
</ul>

<h3><strong>2. The Power of Modular Furniture</strong></h3>
<p>Fixed furniture limits a space's potential. High-performance shared spaces rely on modular systems:</p>
<ul>
  <li><strong>Flexible Benching</strong>: Workstations that can easily expand or shrink based on tenant capacity.</li>
  <li><strong>Mobile Divider Screens</strong>: Moveable writeable whiteboards or acoustic screens to split rooms on demand.</li>
  <li><strong>Reconfigurable Lounge Seating</strong>: Sectional modular sofas that can be rearranged for large presentations or intimate team check-ins.</li>
</ul>

<h3><strong>3. Integrated Connectivity</strong></h3>
<p>In a shared space, access to power and fast Wi-Fi is mandatory. Modern co-working desks must feature seamless cable management, built-in pop-up electrical boxes, USB ports, and wireless charging pads, preventing messy power cords and safety hazards on the floor.</p>

<h3><strong>4. Aesthetics that Inspire</strong></h3>
<p>Co-working members look for a workspace that feels inspiring and premium. Integrating biophilic design (plants, wood grains, natural light), glass partitions, and a curated color palette (like Hecate's warm Gold accents and Navy backgrounds) creates a professional yet welcoming ambiance.</p>
<p>By blending versatility, ergonomics, and modern design aesthetics, shared spaces become environments where businesses thrive.</p>`
  }
];
