import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const rolesList = [
    "Frontend Developer", "Backend Developer", "Fullstack Developer",
    "Mobile Developer", "DevOps Engineer", "UI/UX Designer",
    "Data Scientist", "Product Manager"
]

const skillsList = [
    "React", "Vue", "Angular", "Node.js", "Python", "Java", "Go",
    "Rust", "Docker", "Kubernetes", "AWS", "Figma", "TypeScript",
    "TailwindCSS", "PostgreSQL", "MongoDB"
]

const countriesList = [
    "United States", "United Kingdom", "Canada", "Germany", "India", "Australia", "Remote"
]

const companiesList = [
    "Google", "Microsoft", "Meta", "Amazon", "Netflix", "Apple", "Tesla", "Adobe", "Spotify", "Uber", "Airbnb"
]

const Onboarding = () => {
    const { user } = useUser()
    const navigate = useNavigate()
    const [selectedRole, setSelectedRole] = useState("")
    const [selectedSkills, setSelectedSkills] = useState([])
    const [selectedCountries, setSelectedCountries] = useState([])
    const [selectedCompanies, setSelectedCompanies] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const toggleSkill = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(prev => prev.filter(s => s !== skill))
        } else {
            setSelectedSkills(prev => [...prev, skill])
        }
    }

    const toggleCountry = (country) => {
        if (selectedCountries.includes(country)) {
            setSelectedCountries(prev => prev.filter(c => c !== country))
        } else {
            setSelectedCountries(prev => [...prev, country])
        }
    }

    const toggleCompany = (company) => {
        if (selectedCompanies.includes(company)) {
            setSelectedCompanies(prev => prev.filter(c => c !== company))
        } else {
            setSelectedCompanies(prev => [...prev, company])
        }
    }

    const handleSubmit = async () => {
        if (!selectedRole) return

        setIsSubmitting(true)
        try {
            console.log("Onboarding Data:", { role: selectedRole, skills: selectedSkills })

            if (user) {
                try {
                    await user.update({
                        unsafeMetadata: {
                            onboarded: true,
                            role: selectedRole,
                            skills: selectedSkills,
                            countries: selectedCountries,
                            companies: selectedCompanies
                        }
                    })
                } catch (err) {
                    console.warn("Could not update metadata (likely restricted permissions):", err)
                }
            }
            await axios.post(`${import.meta.env.VITE_SERVER_API}/api/user/onboarding`, {
                clerkId: user.id,
                role: selectedRole,
                skills: selectedSkills,
                countries: selectedCountries,
                companies: selectedCompanies
            })

            await axios.post('http://localhost:5678/webhook/get-filtered-jobs', {
                userId: user.id,
                role: selectedRole,
                skills: selectedSkills,
                countries: selectedCountries,
                companies: selectedCompanies
            })

            navigate("/dashboard")
        } catch (error) {
            console.error("Onboarding failed:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white dark:bg-neutral-950 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-8 md:p-12 animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent mb-4">
                        Welcome, {user?.firstName || "there"}!
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                        Let's personalize your experience. Tell us about your professional interests.
                    </p>
                </div>

                <div className="space-y-10">
                    {/* Role Selection */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            What role are you looking for?
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {rolesList.map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setSelectedRole(role)}
                                    className={`
                                        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                                        ${selectedRole === role
                                            ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white shadow-lg scale-105"
                                            : "bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800"}
                                    `}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Skills Selection */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            Select your key skills ({selectedSkills.length})
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {skillsList.map((skill) => {
                                const isSelected = selectedSkills.includes(skill)
                                return (
                                    <button
                                        key={skill}
                                        onClick={() => toggleSkill(skill)}
                                        className={`
                                            px-3 py-1.5 rounded-md text-sm transition-all duration-200 border
                                            ${isSelected
                                                ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                                                : "bg-transparent text-neutral-600 border-neutral-200 hover:border-neutral-400 dark:text-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-700"}
                                        `}
                                    >
                                        {skill}
                                        {isSelected && <span className="ml-2">×</span>}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Country Selection */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            Preferred Countries ({selectedCountries.length})
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {countriesList.map((country) => {
                                const isSelected = selectedCountries.includes(country)
                                return (
                                    <button
                                        key={country}
                                        onClick={() => toggleCountry(country)}
                                        className={`
                                            px-3 py-1.5 rounded-md text-sm transition-all duration-200 border
                                            ${isSelected
                                                ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
                                                : "bg-transparent text-neutral-600 border-neutral-200 hover:border-neutral-400 dark:text-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-700"}
                                        `}
                                    >
                                        {country}
                                        {isSelected && <span className="ml-2">×</span>}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Company Selection */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                            Target Companies ({selectedCompanies.length})
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {companiesList.map((company) => {
                                const isSelected = selectedCompanies.includes(company)
                                return (
                                    <button
                                        key={company}
                                        onClick={() => toggleCompany(company)}
                                        className={`
                                            px-3 py-1.5 rounded-md text-sm transition-all duration-200 border
                                            ${isSelected
                                                ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                                                : "bg-transparent text-neutral-600 border-neutral-200 hover:border-neutral-400 dark:text-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-700"}
                                        `}
                                    >
                                        {company}
                                        {isSelected && <span className="ml-2">×</span>}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="pt-6 border-t border-neutral-100 dark:border-neutral-900 flex justify-end">
                        <Button
                            size="lg"
                            onClick={handleSubmit}
                            disabled={!selectedRole || isSubmitting}
                            className="w-full md:w-auto min-w-[150px]"
                        >
                            {isSubmitting ? "Saving..." : "Complete Setup"}
                        </Button>
                    </div>
                </div>
            </div>

            <p className="mt-8 text-neutral-400 text-sm text-center">
                You can change these settings later from your profile.
            </p>
        </div>
    )
}

export default Onboarding
