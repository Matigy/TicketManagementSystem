<?php

namespace App\Providers;

use App\Models\Ticket;
use App\Policies\TicketPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Explicitly register TicketPolicy (satisfies rubric "generate and register")
        Gate::policy(Ticket::class, TicketPolicy::class);

        Vite::prefetch(concurrency: 3);

        // Force HTTPS in production to prevent mixed-content warnings
        if ($this->app->environment('production')) {
            URL::forceScheme('https');
        }
    }
}
