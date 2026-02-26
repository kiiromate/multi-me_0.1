import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-01-01',
})

const createBlock = (text: string) => ({
    _type: 'block',
    style: 'normal',
    children: [{ _type: 'span', text }],
})

const createListBlock = (text: string) => ({
    _type: 'block',
    style: 'normal',
    listItem: 'bullet',
    children: [{ _type: 'span', text }],
})

async function seedPhase2() {
    console.log('🌱 Seeding Phase 2 Content...')

    try {
        // 1. UPDATE ABOUT
        const existingAbout = await client.fetch(`*[_type == "about"][0]`)
        const aboutUpdates = {
            heroTitle: 'Making complex systems simple and reliable.',
            heroSupport: 'I connect everyday tools to build resilient workflows. I specialize in technical operations, program delivery, and customer success—cutting through noise to create systems that just work.',
            positioning: {
                howIThink: [
                    createBlock('I focus on operational reality, not theory. My goal is to bring clarity to complex environments by mapping actual workflows and removing friction.'),
                    createBlock('I believe in constraint-driven execution: doing more with the tools a team already uses rather than instantly buying heavyweight software.')
                ],
                whatIBuild: [
                    createBlock('Delivery Pipelines: Predictable and measurable operational engines that reduce lead times.'),
                    createBlock('Customer Success Frameworks: Proactive onboarding and retention systems driven by clear health metrics.'),
                    createBlock('Resilient Operations: Safe modernization of core platforms without breaking production workflows.')
                ],
                howIWork: [
                    createListBlock('Audit Reality: Map the actual process first.'),
                    createListBlock('Leverage the Mundane: Maximize existing tools before adding new ones.'),
                    createListBlock('Standardize: Playbook routine operations to focus entirely on edge cases.'),
                    createListBlock('Protect Production: Implement strict, simple quality gates.'),
                    createListBlock('Measure Adoption: Focus on practical usage and throughput.'),
                ]
            },
            bioVariants: {
                oneLiner: 'Technical Operations & Implementation Specialist focusing on clear systems and human adoption.',
                short: 'I specialize in bringing clarity to complex operational environments. From structuring delivery pipelines to building scalable customer success playbooks, I transform messy workflows into resilient, predictable systems using tools teams already know how to use.',
                full: [
                    createBlock('I specialize in bringing clarity to complex operational environments. My focus is on structuring delivery pipelines and building scalable customer success playbooks that turn messy workflows into resilient, predictable systems.'),
                    createBlock('My approach is straightforward: audit the operational reality, leverage existing tools effectively, and execute with disciplined governance. I thrive when helping teams achieve operational leverage without drowning in unnecessary new software.')
                ]
            },
            ctaText: "I am open to remote-first opportunities in Program Operations and Implementation/Customer Success. Email me at jonathan@kazekeza.com.",
            title: "Technical Operations Specialist"
        }

        if (existingAbout) {
            console.log('📝 Updating existing about document (ID: ' + existingAbout._id + ')...')
            await client.patch(existingAbout._id).set(aboutUpdates).commit()
            console.log('✅ About updated.')
        }

        // 2. CASE STUDIES
        const projects = [
            {
                _type: 'project',
                _id: 'drafts.project-whatsapp-ops',
                title: 'WhatsApp-First Customer Ops System for SMBs',
                slug: { _type: 'slug', current: 'whatsapp-first-customer-ops' },
                description: 'How a basic communication app created unprecedented pipeline discipline.',
                year: 2024,
                status: 'live',
                category: 'commercial',
                caseStudy: [
                    createBlock('Context: An SMB struggled with lead leakage and slow response times because of chaotic, unstructured communication.'),
                    createBlock('Objective: Create a highly disciplined operational pipeline using a tool the team already checks every single day.'),
                    createBlock('Constraints: Zero budget for new enterprise software. The team had high resistance to learning complex new interfaces. Fast implementation was strictly required.'),
                    createBlock('Actions: The solution was simple but incredibly effective. I standardized WhatsApp Business as the only intake channel. I then wired it to a basic Kanban board using a generic automation platform. This "fallait y penser" approach routed incoming messages into automated triage columns and triggered basic follow-up reminders.'),
                    createBlock('Outcomes: The system dramatically reduced dropped leads and improved response times by 45 percent. It created unprecedented pipeline visibility without forcing the team to learn disruptive new software.'),
                    createBlock('Lessons: Operational leverage rarely requires expensive software. True leverage comes from meshing mundane tools into a clever workflow.')
                ]
            },
            {
                _type: 'project',
                _id: 'drafts.project-cms-modernization',
                title: 'CMS-Safe Website Modernization Under Hard Constraints',
                slug: { _type: 'slug', current: 'cms-safe-modernization' },
                description: 'Executing complex interface improvements within hard constraints.',
                year: 2024,
                status: 'live',
                category: 'commercial',
                caseStudy: [
                    createBlock('Context: A mission-critical online platform required significant interface modernization without risking downtime or breaking existing CMS data structures.'),
                    createBlock('Objective: Deliver a modernized and performant interface while maintaining flawless content delivery for the editorial team.'),
                    createBlock('Constraints: The project had strict quality requirements. We had to work with legacy data structures and tolerate absolute zero downtime.'),
                    createBlock('Actions: The genius of the approach was in the governance rather than the code. I established rigorous quality gates before making a single deployment. I implemented updates iteratively by building simple, safe data fetching wrappers. This ensured that any structural changes gracefully fell back instead of causing runtime errors.'),
                    createBlock('Outcomes: I successfully modernized the user experience and maintained 100 percent uptime during the transition. The changes improved site load performance by 32 percent without disrupting the content team for a single day.'),
                    createBlock('Lessons: Sustainable modernization is about respecting existing architecture. Simple quality gates often outperform complex engineering.')
                ]
            },
            {
                _type: 'project',
                _id: 'drafts.project-customer-success-os',
                title: 'Implementation and Customer Success OS',
                slug: { _type: 'slug', current: 'customer-success-os' },
                description: 'Standardized playbooks built entirely with generic tools.',
                year: 2024,
                status: 'live',
                category: 'commercial',
                caseStudy: [
                    createBlock('Context: A growing B2B organization needed a systematic way to onboard users and track account health before active churn occurred.'),
                    createBlock('Objective: Build a proactive Customer Success operating system using highly flexible and completely generic tools.'),
                    createBlock('Constraints: The framework needed to be adopted immediately by a team with completely zero prior structured Customer Success experience.'),
                    createBlock('Actions: I avoided heavyweight Success platforms. Instead, I developed a standardized onboarding playbook with crisp milestones inside a shared document. I then built a simple Health Score framework inside a basic spreadsheet, driven by simple product usage data. Finally, I instituted a strict weekly rhythm for the team to review high-risk accounts.'),
                    createBlock('Outcomes: The team transitioned from reactive firefighting to proactive management in just two weeks. The standardized onboarding pipeline reduced customer time-to-value by 12 days.'),
                    createBlock('Lessons: Customer Success is fundamentally an operational discipline. A strong weekly operating rhythm combined with simple scoring beats complex software every time.')
                ]
            }
        ]

        for (const p of projects) {
            console.log('📝 Creating/Updating Project: ' + p.title)
            await client.createOrReplace(p)
            console.log('✅ Project saved.')
        }

        console.log('✅ All Phase 2 content seeded successfully.')
    } catch (error) {
        console.error('❌ Error during seeding:', error)
        process.exit(1)
    }
}

seedPhase2()
