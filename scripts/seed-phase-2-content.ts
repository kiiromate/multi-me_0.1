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
            heroTitle: 'Simple Tools. Massive Operational Leverage.',
            heroSupport: 'I connect everyday software to build resilient systems. These simple but genius pipelines scale Program Delivery and Customer Success for growing organizations.',
            positioning: {
                howIThink: [
                    createBlock('A central theme defines my career: bringing clarity to complex environments. I specialize in taking systems that "sort of work" and transforming them into resilient engines of growth.'),
                    createBlock('I focus on mapping the actual process rather than the theoretical one. Through constraint-driven execution, I implement workflows, quality gates, and operational rhythms that make technology useful.')
                ],
                whatIBuild: [
                    createBlock('Delivery Pipeline Discipline: Reduced lead times by wiring mundane workflows into predictable and measurable engines.'),
                    createBlock('Implementation and Success: Deployed customer operating systems that proactively identify churn risk using basic data triggers.'),
                    createBlock('Resilient Systems: Modernized core platforms under strict compliance requirements without breaking production environments.')
                ],
                howIWork: [
                    createListBlock('Audit Before You Build: Map the actual process instead of the theoretical one.'),
                    createListBlock('Mundane Tools Mastered: Mesh existing generic tools together before buying new software.'),
                    createListBlock('Standardize the Routine: Playbook the predictable operations so you can focus entirely on the edge cases.'),
                    createListBlock('Quality Gates: Implement strict checks to protect production environments at all times.'),
                    createListBlock('Measure What Matters: Focus exclusively on adoption metrics, throughput, and risk identification.'),
                ]
            },
            bioVariants: {
                oneLiner: 'Senior Technical Operations & Implementation Strategist connecting the dots between complex systems and human adoption.',
                short: 'My career is defined by a central theme: bringing clarity to complex environments. From structuring delivery operations to building scalable customer success playbooks, I specialize in taking systems that "sort of work" and transforming them into resilient engines of growth. I don\'t just implement technology; I implement the workflows, quality gates, and operational rhythms that make technology useful.',
                full: [
                    createBlock('My career is defined by a central theme: bringing clarity to complex environments. From structuring delivery operations to building scalable customer success playbooks, I specialize in taking systems that "sort of work" and transforming them into resilient engines of growth. I don\'t just implement technology; I implement the workflows, quality gates, and operational rhythms that make technology useful.'),
                    createBlock('Whether it\'s deploying a WhatsApp-first operations pipeline or modernizing a legacy CMS under strict constraints, my approach remains consistent: audit the reality, leverage existing tools powerfully, and execute with disciplined governance. I thrive in mission-driven organizations, particularly climate, fintech-for-good, and impact tech, where operational leverage directly translates to increased impact.')
                ]
            },
            ctaText: "I am currently exploring remote-first opportunities in Program Operations and Implementation/Customer Success. I am open to global roles and willing to relocate for the right mission-aligned organization. Email me directly at jonathan@kazekeza.com.",
            title: "Senior Technical Operations & Implementation Strategist"
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
