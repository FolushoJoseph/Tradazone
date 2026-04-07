import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Button from '../../../components/forms/Button';

const PasswordField = ({ label, value, showPassword, toggleVisibility, onChange, error }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-t-secondary uppercase tracking-wide">{label}</label>
        <div className="relative">
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder={`Enter ${label.toLowerCase()}`}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-2.5 pr-12 text-sm bg-white border rounded-lg outline-none transition-colors ${
                    error ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-brand'
                }`}
            />
            <button
                type="button"
                onClick={toggleVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-t-muted hover:text-t-primary"
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
        {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
);

function PasswordSettings() {
    const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
    const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.currentPassword.trim()) {
            newErrors.currentPassword = 'Current password is required';
        }
        if (!formData.newPassword.trim()) {
            newErrors.newPassword = 'New password is required';
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        }
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your new password';
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'New passwords do not match';
        }
        return newErrors;
    };

    const toggleVisibility = (field) => { setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] }); };
    
    const handleChange = (field) => (e) => { 
        setFormData({ ...formData, [field]: e.target.value }); 
        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors({ ...errors, [field]: undefined });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        // API submit logic would go here
        console.log('Password change submitted:', { currentPassword: '[REDACTED]', newPassword: '[REDACTED]' });
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-6">Change Password</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <PasswordField
                    label="Current Password"
                    value={formData.currentPassword}
                    showPassword={showPasswords.current}
                    toggleVisibility={() => toggleVisibility('current')}
                    onChange={handleChange('currentPassword')}
                    error={errors.currentPassword}
                />
                <PasswordField
                    label="New Password"
                    value={formData.newPassword}
                    showPassword={showPasswords.new}
                    toggleVisibility={() => toggleVisibility('new')}
                    onChange={handleChange('newPassword')}
                    error={errors.newPassword}
                />
                <PasswordField
                    label="Confirm New Password"
                    value={formData.confirmPassword}
                    showPassword={showPasswords.confirm}
                    toggleVisibility={() => toggleVisibility('confirm')}
                    onChange={handleChange('confirmPassword')}
                    error={errors.confirmPassword}
                />
                <div className="flex justify-end pt-4 border-t border-border">
                    <Button type="submit" variant="primary">Update Password</Button>
                </div>
            </form>
        </div>
    );
}

export default PasswordSettings;