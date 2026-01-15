import Navbar from '../components/main/Navbar';
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

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

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex flex-col font-poppins selection:bg-light-primary selection:text-white dark:selection:bg-dark-primary">
            <Navbar />
            
            <main className="flex-grow flex flex-col relative overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-light-primary/5 dark:bg-dark-primary/10 rounded-full blur-[100px] opacity-60" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-light-secondary/5 dark:bg-dark-secondary/10 rounded-full blur-[120px] opacity-60" />
                </div>

                {/* Hero Section */}
                <section className="relative z-10 flex-grow flex items-center justify-center px-6 lg:px-8 py-20">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={stagger}
                            className="space-y-8"
                        >
                            <motion.div variants={fadeIn} className="flex justify-center">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-sm font-medium text-light-secondary-text dark:text-dark-secondary-text shadow-sm hover:shadow-md transition-shadow cursor-default">
                                    <Sparkles className="w-4 h-4 text-light-primary dark:text-dark-primary" />
                                    <span>Reimagining Recruitment</span>
                                </span>
                            </motion.div>

                            <motion.h1 
                                variants={fadeIn}
                                className="text-5xl md:text-7xl font-bold tracking-tight text-light-primary-text dark:text-dark-primary-text leading-[1.1]"
                            >
                                Your Dream Career <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary">
                                    Starts Here.
                                </span>
                            </motion.h1>

                            <motion.p 
                                variants={fadeIn}
                                className="text-xl text-light-secondary-text dark:text-dark-secondary-text max-w-2xl mx-auto leading-relaxed"
                            >
                                Connect directly with top companies. GapZero removes the noise, giving you a streamlined path to your next big opportunity.
                            </motion.p>

                            <motion.div 
                                variants={fadeIn}
                                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                            >
                                <button
                                    onClick={() => navigate(isSignedIn ? "/dashboard" : "/sign-up")}
                                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-light-primary dark:bg-dark-primary px-8 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-light-primary-hover dark:hover:bg-dark-primary-hover focus:outline-none focus:ring-2 focus:ring-light-primary dark:focus:ring-dark-primary focus:ring-offset-2 hover:shadow-lg dark:focus:ring-offset-dark-bg min-w-[200px]"
                                >
                                    <span className="mr-2 text-lg">{isSignedIn ? "Visit Dashboard" : "Get Started"}</span>
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </button>
                                
                                {!isSignedIn && (
                                    <button 
                                        onClick={() => navigate("/sign-in")}
                                        className="h-12 px-8 rounded-full font-medium text-light-secondary-text dark:text-dark-secondary-text hover:text-light-primary-text dark:hover:text-dark-primary-text hover:bg-light-surface dark:hover:bg-dark-surface transition-all duration-300"
                                    >
                                        Log In
                                    </button>
                                )}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Minimal Features Grid */}
                <section className="relative z-10 py-16 bg-light-surface/30 dark:bg-dark-surface/10 backdrop-blur-sm border-t border-light-border dark:border-dark-border">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { 
                                    icon: Zap, 
                                    title: "Instant Matches", 
                                    desc: "Our AI pairs you with jobs that fit your skills perfectly." 
                                },
                                { 
                                    icon: CheckCircle, 
                                    title: "Direct Access", 
                                    desc: "Skip the queues and chat directly with hiring teams." 
                                },
                                { 
                                    icon: Shield, 
                                    title: "Verified Jobs", 
                                    desc: "Every opportunity is vetted for authenticity and quality." 
                                }
                            ].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="p-6 rounded-2xl hover:bg-light-surface dark:hover:bg-dark-surface transition-colors cursor-default border border-transparent hover:border-light-border dark:hover:border-dark-border"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-light-primary/10 dark:bg-dark-primary/10 flex items-center justify-center text-light-primary dark:text-dark-primary mb-4">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-light-primary-text dark:text-dark-primary-text mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-light-secondary-text dark:text-dark-secondary-text leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Simple Footer */}
            <footer className="py-8 bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-light-secondary-text dark:text-dark-secondary-text">
                    <p>&copy; {new Date().getFullYear()} GapZero. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-light-primary dark:hover:text-dark-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-light-primary dark:hover:text-dark-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-light-primary dark:hover:text-dark-primary transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Landing;