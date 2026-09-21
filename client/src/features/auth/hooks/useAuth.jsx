import { useForm } from "react-hook-form";


export const useAuth = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            role: 'user'
        }
    });

    return { register, handleSubmit, errors, isSubmitting, watch };

}

export const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
};


export const getStrengthLabel = (score) => {
    switch (score) {
        case 1:
            return 'WEAK';
        case 2:
            return 'FAIR';
        case 3:
            return 'GOOD';
        case 4:
            return 'STRONG';
        default:
            return 'WEAK';
    }
};