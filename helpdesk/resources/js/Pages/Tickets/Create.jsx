import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

// ─── Shared Field Components ──────────────────────────────────────────────────

function FieldError({ message }) {
    if (!message) return null;
    return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

function Label({ htmlFor, children, required }) {
    return (
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
            {children}
            {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
        </label>
    );
}

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'Open',
        category: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('tickets.store'), {
            onSuccess: () => reset(),
        });
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <Link
                        href={route('tickets.index')}
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Tickets
                    </Link>
                    <span className="text-gray-300">/</span>
                    <h1 className="text-xl font-bold text-gray-900">New Ticket</h1>
                </div>
            }
        >
            <Head title="Create Ticket" />

            <div className="max-w-2xl">
                <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-6 sm:p-8">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">Submit a Support Ticket</h2>
                        <p className="text-sm text-gray-500 mt-1">Fill in the details below and we'll get back to you.</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        {/* Title */}
                        <div>
                            <Label htmlFor="title" required>Title</Label>
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Brief summary of the issue"
                                className={`w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                    ${errors.title ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                                aria-describedby={errors.title ? 'title-error' : undefined}
                                aria-invalid={!!errors.title}
                            />
                            <FieldError message={errors.title} />
                        </div>

                        {/* Description */}
                        <div>
                            <Label htmlFor="description" required>Description</Label>
                            <textarea
                                id="description"
                                rows={5}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Describe the issue in detail..."
                                className={`w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y
                                    ${errors.description ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                                aria-invalid={!!errors.description}
                            />
                            <FieldError message={errors.description} />
                        </div>

                        {/* Category + Priority Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="category" required>Category</Label>
                                <select
                                    id="category"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className={`w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                        ${errors.category ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                                    aria-invalid={!!errors.category}
                                >
                                    <option value="">Select category</option>
                                    {['Hardware', 'Software', 'Network', 'Account', 'Other'].map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                                <FieldError message={errors.category} />
                            </div>

                            <div>
                                <Label htmlFor="priority" required>Priority</Label>
                                <select
                                    id="priority"
                                    value={data.priority}
                                    onChange={(e) => setData('priority', e.target.value)}
                                    className={`w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                                        ${errors.priority ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                                    aria-invalid={!!errors.priority}
                                >
                                    {['Low', 'Medium', 'High', 'Urgent'].map((p) => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                                <FieldError message={errors.priority} />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
                            <Link
                                href={route('tickets.index')}
                                className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {processing && (
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                )}
                                {processing ? 'Submitting…' : 'Submit Ticket'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
