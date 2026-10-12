<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // firstOrCreate ensures this is safe to run multiple times
        $user = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name'              => 'Test User',
                'password'          => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Only seed tickets if the user has none
        if ($user->tickets()->count() > 0) {
            return;
        }

        $tickets = [
            [
                'title'       => 'Monitor not displaying output after restart',
                'description' => 'My external monitor stopped working after restarting the computer. The cable is properly connected and the monitor powers on but shows no signal.',
                'priority'    => 'High',
                'status'      => 'Open',
                'category'    => 'Hardware',
            ],
            [
                'title'       => 'Cannot install VS Code on company laptop',
                'description' => 'The installation wizard freezes at 80% progress when trying to install Visual Studio Code. I have tried running as administrator but the issue persists.',
                'priority'    => 'Medium',
                'status'      => 'In Progress',
                'category'    => 'Software',
            ],
            [
                'title'       => 'VPN disconnects every 10 minutes',
                'description' => 'The corporate VPN client drops connection approximately every 10 minutes while working from home. This interrupts remote desktop sessions and causes data loss.',
                'priority'    => 'Urgent',
                'status'      => 'Open',
                'category'    => 'Network',
            ],
            [
                'title'       => 'Password reset not working for email account',
                'description' => 'I requested a password reset for my work email but the reset link is never received. I have checked spam folders. The account was created last week.',
                'priority'    => 'High',
                'status'      => 'Resolved',
                'category'    => 'Account',
            ],
            [
                'title'       => 'Office printer jamming on duplex print jobs',
                'description' => 'The shared printer in Room 204 consistently jams when printing duplex (double-sided) documents. Single-sided jobs print fine. The issue started after replacing the paper tray.',
                'priority'    => 'Medium',
                'status'      => 'Open',
                'category'    => 'Hardware',
            ],
            [
                'title'       => 'Excel crashing when opening large files',
                'description' => 'Microsoft Excel crashes without warning when opening spreadsheets larger than 5MB. This happens on all .xlsx files with more than 10,000 rows of data.',
                'priority'    => 'Medium',
                'status'      => 'In Progress',
                'category'    => 'Software',
            ],
            [
                'title'       => 'Slow internet connection in Conference Room B',
                'description' => 'The WiFi speed in Conference Room B is extremely slow (less than 1 Mbps) making video calls impossible. Other rooms on the same floor have normal speeds.',
                'priority'    => 'High',
                'status'      => 'Open',
                'category'    => 'Network',
            ],
            [
                'title'       => 'Multi-factor authentication app lost after phone replacement',
                'description' => 'I replaced my phone and lost access to the authenticator app. I cannot log into any company systems that require MFA. Need backup codes or account recovery.',
                'priority'    => 'Urgent',
                'status'      => 'Resolved',
                'category'    => 'Account',
            ],
            [
                'title'       => 'Request for additional RAM on development workstation',
                'description' => 'My workstation runs very slowly when running multiple development tools simultaneously. I need the RAM upgraded from 8GB to 16GB to improve productivity.',
                'priority'    => 'Low',
                'status'      => 'Closed',
                'category'    => 'Hardware',
            ],
            [
                'title'       => 'Slack notifications not working on macOS',
                'description' => 'Desktop notifications for Slack stopped appearing on my MacBook Pro. Notifications are enabled in both Slack settings and macOS system preferences.',
                'priority'    => 'Low',
                'status'      => 'Closed',
                'category'    => 'Software',
            ],
            [
                'title'       => 'Cannot access internal wiki from remote network',
                'description' => 'When working remotely and connected through VPN, I cannot access the internal company wiki. Other internal resources work fine. Error: connection timed out.',
                'priority'    => 'Medium',
                'status'      => 'Open',
                'category'    => 'Other',
            ],
            [
                'title'       => 'New employee onboarding account setup request',
                'description' => 'I joined the company this week and still do not have access to the project management tool, code repository, or design system. Please set up all required accounts.',
                'priority'    => 'High',
                'status'      => 'In Progress',
                'category'    => 'Account',
            ],
        ];

        foreach ($tickets as $ticket) {
            $user->tickets()->create($ticket);
        }
    }
}
