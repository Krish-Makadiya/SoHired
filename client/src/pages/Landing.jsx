import Navbar from '../components/main/Navbar';
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle, Zap, Shield, Hexagon, Twitter, Github } from "lucide-react";
import { motion } from "framer-motion";
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import { LogoCloud } from '@/components/logo-cloud-3';
import { cn } from '@/lib/utils';
import { HeroSection } from '@/components/hero-section-2';
import { FeaturesSectionWithHoverEffects } from '@/components/feature-section-with-hover-effects';
import { StatsCounter } from '@/components/ui/stats-counter';
import { PricingWithChart } from '@/components/pricing-with-chart';
import { Footer } from '@/components/ui/footer';

const Landing = () => {
    const { isSignedIn } = useAuth();
    const navigate = useNavigate();

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const stagger = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const logos = [
        {
            src: "https://svgl.app/library/nvidia-wordmark-light.svg",
            alt: "Nvidia Logo",
        },
        {
            src: "https://svgl.app/library/supabase_wordmark_light.svg",
            alt: "Supabase Logo",
        },
        {
            src: "https://svgl.app/library/openai_wordmark_light.svg",
            alt: "OpenAI Logo",
        },
        {
            src: "https://svgl.app/library/turso-wordmark-light.svg",
            alt: "Turso Logo",
        },
        {
            src: "https://svgl.app/library/vercel_wordmark.svg",
            alt: "Vercel Logo",
        },
        {
            src: "https://svgl.app/library/github_wordmark_light.svg",
            alt: "GitHub Logo",
        },
        {
            src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg",
            alt: "Claude AI Logo",
        },
        {
            src: "https://svgl.app/library/clerk-wordmark-light.svg",
            alt: "Clerk Logo",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col font-poppins selection:bg-light-primary selection:text-white dark:selection:bg-dark-primary">
            <Navbar />

            <HeroGeometric />

            <HeroSection />
            <LogoCloud logos={logos} />


            <FeaturesSectionWithHoverEffects />
            <StatsCounter />

            <PricingWithChart />

            <Footer
                logo={"/logo-light-bnw.png"}
                brandName="SoHired"
                socialLinks={[
                    {
                        icon: <Twitter className="h-5 w-5" />,
                        href: "https://twitter.com",
                        label: "Twitter",
                    },
                    {
                        icon: <Github className="h-5 w-5" />,
                        href: "https://github.com",
                        label: "GitHub",
                    },
                ]}
                mainLinks={[
                    { href: "/products", label: "Products" },
                    { href: "/about", label: "About" },
                    { href: "/blog", label: "Blog" },
                    { href: "/contact", label: "Contact" },
                ]}
                legalLinks={[
                    { href: "/privacy", label: "Privacy" },
                    { href: "/terms", label: "Terms" },
                ]}
                copyright={{
                    text: "© 2026 SoHired",
                    license: "All rights reserved",
                }}
            />
        </div>
    );
}

export default Landing;