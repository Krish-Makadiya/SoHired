import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, FileText, CheckCircle, AlertCircle, Info,
    TrendingUp, Target, Brain, Zap, Loader2, X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mock Data from the prompt
const MOCK_RESULT = [
    {
        "atsScore": 93,
        "matchStatus": "High Match",
        "summary": "This candidate is an exceptional fit, possessing MERN expertise, strong measurable impact (40% speed boost), and covering advanced preferred skills like Docker, Kubernetes, Next.js, and Redis. Despite being an early career profile, their project scope and technology breadth indicate readiness for this role's technical demands.",
        "hardSkills": {
            "present": [
                "MERN Stack", "React.js", "Node.js", "Express.js", "MongoDB",
                "JavaScript (ES6+)", "RESTful APIs", "Tailwind CSS", "Performance Optimization",
                "Git/GitHub"
            ],
            "missing": [
                "TypeScript", "OAuth",
                "MongoDB Aggregation", "AWS/Cloud"
            ]
        },
        "implicitSkillsDetected": [
            {
                "skill": "State Management (React)",
                "reason": "Building complex, interactive UIs like the Arogya platform with video/chat requires advanced state management (e.g., Redux/Context)."
            },
            {
                "skill": "Database Schema Design",
                "reason": "Designing secure digital health records and implementing end-to-end workflows for a telemedicine platform necessitates strong MongoDB schema design."
            },
            {
                "skill": "CI/CD & Deployment Automation",
                "reason": "Explicit mention of 'CI/CD' in the summary and usage of Jenkins and Docker Hub in the SharkChat project."
            },
            {
                "skill": "Nginx Configuration / Reverse Proxying",
                "reason": "Used Nginx to design a scalable, containerized architecture to handle concurrent users with low latency, implying reverse proxy and basic load balancing knowledge."
            }
        ],
        "quantificationAnalysis": {
            "score": "High",
            "explanation": "Excellent usage of hard metrics for an intern/early career profile. Key impacts include 'Boosted 40% page load speed,' 'inspected 15+ PRs,' and 'Led a 6-member team.' Metrics focus on speed, volume, and leadership scope."
        },
        "fluffPhrases": [
            "collaborative, ownership-driven mindset"
        ],
        "improvementPlan": {
            "weakestBulletPoint": "Adhered to bi-weekly sprint planning and inspected 15+ PRs to ensure code quality and enhance collaboration among different modules in the team.",
            "suggestedRewrite": "Drove application quality and integration velocity by inspecting 15+ cross-functional Pull Requests during bi-weekly Agile sprints, preventing critical errors and accelerating feature deployment by 10% [inferred metric]."
        },
        "interviewPrep": {
            "predictedQuestion": "Your SharkChat project utilized Docker, Kubernetes, and Socket.IO. If your application needed to scale across multiple Kubernetes pods, how did you architect Socket.IO (e.g., using Redis adapters) to maintain consistent state and ensure reliable real-time message delivery across the cluster?"
        }
    }
];

const InfoTrigger = ({ content }) => (
    <TooltipProvider>
        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
                <div className="cursor-help inline-flex items-center justify-center ml-2 text-muted-foreground hover:text-primary transition-colors">
                    <Info className="w-4 h-4" />
                </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs p-3">
                <p className="text-sm">{content}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
);

const ScoreCircle = ({ score }) => {
    const radius = 60;
    const stroke = 12;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center p-4">
            <svg
                height={radius * 2}
                width={radius * 2}
                className="-rotate-90 transition-all duration-1000 ease-out"
            >
                <circle
                    stroke="var(--color-input)"
                    strokeWidth={stroke}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <motion.circle
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    stroke="var(--color-primary)"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    style={{ strokeDasharray: circumference + ' ' + circumference }}
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-4xl font-bold font-['Titan_One'] text-primary"
                >
                    {score}
                </motion.span>
                <span className="text-xs text-muted-foreground font-semibold">ATS SCORE</span>
            </div>
        </div>
    );
};

const ATSScanner = () => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleScan = () => {
        if (!file) return;
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setResult(MOCK_RESULT[0]);
            setLoading(false);
        }, 2500);
    };

    const resetScanner = () => {
        setFile(null);
        setResult(null);
    };

    return (
        <div className="min-h-screen p-6 md:p-10 space-y-12 max-w-7xl mx-auto">

            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-['Titan_One'] text-foreground">
                    ATS <span className="text-primary">Resume Scanner</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Optimize your resume with AI-powered insights. Get a detailed analysis of your ATS score,
                    missing skills, and actionable improvements.
                </p>
            </div>

            <AnimatePresence mode="wait">
                {!result ? (
                    <motion.div
                        key="upload"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-3xl bg-card/30 hover:bg-card/50 transition-colors backdrop-blur-sm"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            id="resume-upload"
                            className="hidden"
                            accept=".pdf,.docx,.doc"
                            onChange={handleFileChange}
                        />

                        <div className={`
              rounded-full p-8 mb-6 transition-all duration-300
              ${isDragging ? 'bg-primary/20 scale-110' : 'bg-secondary/50'}
            `}>
                            <Upload className={`w-12 h-12 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>

                        <h3 className="text-2xl font-semibold mb-2 text-center">
                            {file ? file.name : "Drag & drop your resume here"}
                        </h3>
                        <p className="text-muted-foreground text-center mb-8 max-w-md">
                            {file ? "Ready to analyze? Click the button below." : "Supported formats: PDF, DOCX. Max file size: 5MB."}
                        </p>

                        <div className="flex gap-4">
                            {file && (
                                <Button variant="outline" size="lg" onClick={() => setFile(null)}>
                                    Remove
                                </Button>
                            )}
                            <Button
                                size="lg"
                                className="px-8 min-w-[200px] text-lg font-medium shadow-lg shadow-primary/20"
                                onClick={file ? handleScan : () => document.getElementById('resume-upload').click()}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    file ? "Start Analysis" : "Browse Files"
                                )}
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8"
                    >
                        {/* Top Bar: Score & Status */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Score Card */}
                            <Card className="col-span-1 border-none shadow-xl bg-linear-to-br from-card to-secondary/30">
                                <CardHeader className="pb-0">
                                    <CardTitle className="flex items-center text-lg font-medium text-muted-foreground">
                                        Overall Match
                                        <InfoTrigger content="Your ATS readiness score based on keyword matching, formatting, and content relevance." />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center justify-center pt-2">
                                    <ScoreCircle score={result.atsScore} />
                                    <Badge variant={result.matchStatus === "High Match" ? "default" : "secondary"} className="mt-4 px-4 py-1 text-sm rounded-full">
                                        {result.matchStatus}
                                    </Badge>
                                </CardContent>
                            </Card>

                            {/* Summary Card */}
                            <Card className="col-span-1 lg:col-span-2 border-none shadow-lg bg-card/60 backdrop-blur-md">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Brain className="w-5 h-5 text-primary" />
                                        AI Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-lg leading-relaxed text-foreground/90 font-light">
                                        {result.summary}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Skills Analysis */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Present Skills */}
                            <Card className="border-l-4 border-l-green-500 shadow-md">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-500" /> Matches
                                        </span>
                                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                            {result.hardSkills.present.length} Found
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {result.hardSkills.present.map((skill, i) => (
                                            <Badge key={i} variant="secondary" className="px-3 py-1 bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Missing Skills */}
                            <Card className="border-l-4 border-l-red-500 shadow-md">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <AlertCircle className="w-5 h-5 text-red-500" /> Missing
                                        </span>
                                        <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                                            {result.hardSkills.missing.length} Missing
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {result.hardSkills.missing.map((skill, i) => (
                                            <Badge key={i} variant="outline" className="px-3 py-1 border-red-200 text-red-600 dark:border-red-900/50 dark:text-red-400">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Implicit Skills */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <h2 className="text-2xl font-bold">Implicit Skills Detected</h2>
                                <InfoTrigger content="Skills inferred from your project descriptions and tasks, even if not explicitly listed." />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {result.implicitSkillsDetected.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-5 rounded-xl border bg-card hover:border-primary/50 transition-colors shadow-sm"
                                    >
                                        <h3 className="font-semibold text-lg text-primary mb-2">{item.skill}</h3>
                                        <p className="text-sm text-muted-foreground">{item.reason}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Metrics & Fluff */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="col-span-1 lg:col-span-2 shadow-md">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-blue-500" />
                                        Impact Quantification
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Score</div>
                                        <Badge className="bg-blue-500 text-white hover:bg-blue-600">{result.quantificationAnalysis.score}</Badge>
                                    </div>
                                    <p className="text-foreground/80">{result.quantificationAnalysis.explanation}</p>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md border-red-100 dark:border-red-900/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <X className="w-5 h-5 text-red-500" />
                                        Vague Phrases
                                    </CardTitle>
                                    <CardDescription>Avoid these fluff words</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {result.fluffPhrases.map((phrase, i) => (
                                            <span key={i} className="px-3 py-1 rounded-md bg-red-100 text-red-600 text-sm font-medium dark:bg-red-900/20 dark:text-red-400">
                                                {phrase}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Improvement Plan */}
                        <Card className="bg-secondary/20 border-none shadow-inner">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="w-5 h-5 text-purple-500" />
                                    Improvement Suggestion
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2 p-4 rounded-lg bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                                    <h4 className="font-semibold text-red-600 dark:text-red-400 text-sm uppercase">Weak Bullet Point</h4>
                                    <p className="text-sm italic text-muted-foreground">"{result.improvementPlan.weakestBulletPoint}"</p>
                                </div>
                                <div className="space-y-2 p-4 rounded-lg bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30">
                                    <h4 className="font-semibold text-green-600 dark:text-green-400 text-sm uppercase">Suggested Rewrite</h4>
                                    <p className="text-sm font-medium text-foreground">{result.improvementPlan.suggestedRewrite}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Interview Prep */}
                        <Card className="bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Zap className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    Prep for your Interview
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <h4 className="font-medium text-white/80 mb-2 text-sm uppercase tracking-wide">Most Likely Question</h4>
                                <p className="text-lg font-medium leading-relaxed">
                                    "{result.interviewPrep.predictedQuestion}"
                                </p>
                            </CardContent>
                        </Card>

                        <div className="flex justify-center pt-8">
                            <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={resetScanner}>
                                Upload another resume
                            </Button>
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ATSScanner;