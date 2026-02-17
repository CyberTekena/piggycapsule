# PiggyCapsule Quick Start Script
# Run this from the backend directory

Write-Host "🚀 PiggyCapsule Backend Setup" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "❌ .env file not found!" -ForegroundColor Red
    Write-Host "📝 Please create .env file from .env.example and configure your credentials`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Environment file found" -ForegroundColor Green

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies...`n" -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ npm install failed!" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✓ Dependencies installed" -ForegroundColor Green

# Generate Prisma client
Write-Host "`n📝 Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Prisma generate failed!" -ForegroundColor Red
    Write-Host "Make sure DATABASE_URL is set correctly in .env`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Prisma client generated" -ForegroundColor Green

# Run migrations
Write-Host "`n📊 Running database migrations..." -ForegroundColor Yellow
Write-Host "(This will create all tables in your database)`n" -ForegroundColor Gray
npx prisma migrate dev --name init
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Database migration failed!" -ForegroundColor Red
    Write-Host "Please check your DATABASE_URL and ensure PostgreSQL is running`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "✓ Database migrated successfully" -ForegroundColor Green

# Success message
Write-Host "`n✨ Setup complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host "`nYou can now:" -ForegroundColor Cyan
Write-Host "  • Start the dev server:  npm run start:dev" -ForegroundColor White
Write-Host "  • Open Prisma Studio:    npx prisma studio" -ForegroundColor White
Write-Host "  • View API docs:         http://localhost:3000`n" -ForegroundColor White

Write-Host "📖 See README.md for API endpoint documentation" -ForegroundColor Gray
