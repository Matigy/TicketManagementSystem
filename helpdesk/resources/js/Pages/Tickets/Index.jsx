import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

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

function PriorityBadge({ priority }) {
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${PRIORITY_STYLES[priority] ?? 'bg-gray-100 text-gray-700'}`}>
            {priority}
        </span>
    );
}

function StatusBadge({ status }) {
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-700'}`}>
            {status}
        </span>
    );
}

// ─── Empty State ─────────────────────────────────────────────────────────────

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
                <svg className="h-10 w-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No tickets yet</h3>
            <p className="mt-1 text-sm text-gray-500 max-w-xs">
                You haven't submitted any support tickets. Create your first one to get help.
            </p>
            <Link
                href={route('tickets.create')}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create your first ticket
            </Link>
        </div>
    );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({ links }) {
    if (!links || links.length <= 3) return null;
    return (
        <nav className="flex items-center justify-center gap-1 pt-4" aria-label="Pagination">
            {links.map((link, i) => (
                <Link
                    key={i}
                    href={link.url ?? '#'}
                    preserveScroll
                    preserveState
                    className={`px-3 py-1.5 text-sm rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
                        ${link.active
                            ? 'border-indigo-600 bg-indigo-600 text-white font-semibold'
                            : link.url
                                ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                : 'border-gray-200 bg-white text-gray-300 cursor-default pointer-events-none'
                        }`}
                >
                    {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                </Link>
            ))}
        </nav>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Index({ tickets }) {
    const { data, links } = tickets;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Tickets</h1>
                        <p className="text-sm text-gray-500 mt-0.5">Manage and track your support requests</p>
                    </div>
                    <Link
                        href={route('tickets.create')}
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Ticket
                    </Link>
                </div>
            }
        >
            <Head title="My Tickets" />

            {data.length === 0 ? (
                <div className="rounded-xl bg-white shadow-sm border border-gray-100">
                    <EmptyState />
                </div>
            ) : (
                <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                    {/* ── Desktop Table (md+) ─────────────────────────────── */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50 text-left">
                                    <th className="px-6 py-3.5 font-semibold text-gray-600">Title</th>
                                    <th className="px-4 py-3.5 font-semibold text-gray-600">Category</th>
                                    <th className="px-4 py-3.5 font-semibold text-gray-600">Priority</th>
                                    <th className="px-4 py-3.5 font-semibold text-gray-600">Status</th>
                                    <th className="px-4 py-3.5 font-semibold text-gray-600">Created</th>
                                    <th className="px-4 py-3.5 font-semibold text-gray-600 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {data.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <Link
                                                href={route('tickets.show', ticket.id)}
                                                className="font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                                            >
                                                {ticket.title}
                                            </Link>
                                        </td>
                                        <td className="px-4 py-4 text-gray-600">{ticket.category}</td>
                                        <td className="px-4 py-4">
                                            <PriorityBadge priority={ticket.priority} />
                                        </td>
                                        <td className="px-4 py-4">
                                            <StatusBadge status={ticket.status} />
                                        </td>
                                        <td className="px-4 py-4 text-gray-500">
                                            {new Date(ticket.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'short', day: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={route('tickets.show', ticket.id)}
                                                    className="rounded-md px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 border border-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('tickets.edit', ticket.id)}
                                                    className="rounded-md px-3 py-1.5 text-xs font-medium text-amber-600 hover:bg-amber-50 border border-amber-200 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ── Mobile Cards (< md) ─────────────────────────────── */}
                    <div className="md:hidden divide-y divide-gray-100">
                        {data.map((ticket) => (
                            <div key={ticket.id} className="p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <Link
                                        href={route('tickets.show', ticket.id)}
                                        className="text-sm font-semibold text-gray-900 hover:text-indigo-600 transition-colors leading-snug"
                                    >
                                        {ticket.title}
                                    </Link>
                                    <StatusBadge status={ticket.status} />
                                </div>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                    <span className="text-xs text-gray-500">{ticket.category}</span>
                                    <span className="text-gray-300">·</span>
                                    <PriorityBadge priority={ticket.priority} />
                                    <span className="text-gray-300">·</span>
                                    <span className="text-xs text-gray-400">
                                        {new Date(ticket.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'short', day: 'numeric',
                                        })}
                                    </span>
                                </div>
                                <div className="mt-3 flex gap-2">
                                    <Link
                                        href={route('tickets.show', ticket.id)}
                                        className="rounded-md px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50 border border-indigo-200 transition-colors"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={route('tickets.edit', ticket.id)}
                                        className="rounded-md px-3 py-1.5 text-xs font-medium text-amber-600 hover:bg-amber-50 border border-amber-200 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="border-t border-gray-100 px-6 py-4">
                        <Pagination links={links} />
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
