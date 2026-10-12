import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

// ─── Badge Helpers ───────────────────────────────────────────────────────────

const PRIORITY_STYLES = {
    Urgent: 'bg-red-100 text-red-800',
    High:   'bg-orange-100 text-orange-800',
    Medium: 'bg-amber-100 text-amber-800',
    Low:    'bg-slate-100 text-slate-700',
};

const STATUS_STYLES = {
    'Open':        'bg-blue-100 text-blue-800',
    'In Progress': 'bg-purple-100 text-purple-800',
    'Resolved':    'bg-emerald-100 text-emerald-800',
    'Closed':      'bg-gray-100 text-gray-700',
};

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

function DeleteModal({ ticketId, onCancel }) {
    const [deleting, setDeleting] = useState(false);

    function handleDelete() {
        setDeleting(true);
        router.delete(route('tickets.destroy', ticketId), {
            onFinish: () => setDeleting(false),
        });
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onCancel}
                aria-hidden="true"
            />

            {/* Panel */}
            <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100">
                        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div>
                        <h2 id="delete-modal-title" className="text-base font-semibold text-gray-900">
                            Delete this ticket?
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            This action is permanent and cannot be undone. The ticket and all its data will be removed immediately.
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={deleting}
                        className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 border border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-60"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        {deleting && (
                            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        )}
                        {deleting ? 'Deleting…' : 'Yes, delete ticket'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Detail Row ───────────────────────────────────────────────────────────────

function DetailRow({ label, children }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-3 border-b border-gray-50 last:border-0">
            <dt className="sm:w-32 shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-400">
                {label}
            </dt>
            <dd className="text-sm text-gray-800 font-medium">{children}</dd>
        </div>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Show({ ticket }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
                        My Tickets
                    </Link>
                    <span className="text-gray-300">/</span>
                    <h1 className="text-xl font-bold text-gray-900">Ticket #{ticket.id}</h1>
                </div>
            }
        >
            <Head title={`Ticket #${ticket.id} – ${ticket.title}`} />

            <div className="max-w-2xl space-y-4">
                {/* Main card */}
                <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                    {/* Card header */}
                    <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 leading-snug">{ticket.title}</h2>
                        <span className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[ticket.status] ?? 'bg-gray-100 text-gray-700'}`}>
                            {ticket.status}
                        </span>
                    </div>

                    {/* Description */}
                    <div className="px-6 py-5 border-b border-gray-100">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Description</p>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{ticket.description}</p>
                    </div>

                    {/* Meta details */}
                    <dl className="px-6 py-2">
                        <DetailRow label="Category">{ticket.category}</DetailRow>
                        <DetailRow label="Priority">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${PRIORITY_STYLES[ticket.priority] ?? 'bg-gray-100 text-gray-700'}`}>
                                {ticket.priority}
                            </span>
                        </DetailRow>
                        <DetailRow label="Created">
                            {new Date(ticket.created_at).toLocaleString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric',
                                hour: '2-digit', minute: '2-digit',
                            })}
                        </DetailRow>
                        <DetailRow label="Last Updated">
                            {new Date(ticket.updated_at).toLocaleString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric',
                                hour: '2-digit', minute: '2-digit',
                            })}
                        </DetailRow>
                    </dl>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                    <Link
                        href={route('tickets.edit', ticket.id)}
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Ticket
                    </Link>
                    <button
                        type="button"
                        onClick={() => setShowDeleteModal(true)}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Ticket
                    </button>
                </div>
            </div>

            {showDeleteModal && (
                <DeleteModal
                    ticketId={ticket.id}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </AuthenticatedLayout>
    );
}
