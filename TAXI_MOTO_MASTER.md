```markdown
# TAXI MOTO - COMPLETE SPEC FOR AI GENERATION

## Project Overview
Taxi Moto is a production-grade ride-sharing MVP focused on moto-taxi services 
in North Africa. Built with React 19, Supabase, and deployed free on Vercel.

## Technology Stack
- Frontend: React 19 + Vite + Tailwind CSS
- Backend: Supabase (PostgreSQL + Auth + Realtime + Storage)
- Hosting: Vercel (free)
- State: Zustand
- HTTP: Axios
- Validation: Zod
- Maps: React-Leaflet
- Charts: Recharts
- Payments: Stripe integration

## Business Logic

### Commission Model
- Platform takes 20% of fare
- Driver gets 80%
- Example: $10 ride = $8 to driver, $2 to platform

### Fare Calculation
Fare = (Base Fare + Distance Fee + Time Fee) × Surge Multiplier - Promo Discount
Base Fare = $2.00
Distance Fee = $0.50 per km
Time Fee = $0.10 per minute
Surge Multiplier = 1.5x-3x during peak hours (6-9 AM, 5-8 PM)

### Driver Approval Workflow
1. Driver signs up with phone
2. Driver uploads documents (License, Insurance, Registration, ID)
3. Admin reviews documents
4. Admin approves/rejects
5. Driver receives email notification
6. Approved drivers can go online
7. Documents re-verify annually

### Ride Lifecycle
Rider:
1. Open app → Enter destination
2. See nearby drivers with fare estimates
3. Select driver → Confirm booking
4. Track driver in real-time
5. Ride complete → Pay → Rate driver (1-5 stars)
6. Download receipt (PDF)

Driver:
1. Open app → Request appears (10-sec countdown)
2. Accept/Reject ride
3. Navigate to pickup
4. Confirm arrival
5. Navigate to destination
6. Confirm completion
7. View earnings updated in real-time

Admin:
1. Login to dashboard
2. See real-time metrics (rides, drivers, revenue)
3. Review unapproved drivers
4. Approve/reject with documents
5. Monitor active rides
6. View earnings breakdown
7. Manage complaints & disputes

## Database Schema

### Users Table
id (UUID) - Primary key
auth_id (UUID) - References Supabase Auth
email (VARCHAR) - Unique
phone (VARCHAR) - Unique, required
name (VARCHAR)
role (VARCHAR) - 'rider', 'driver', 'admin'
status (VARCHAR) - 'active', 'suspended', 'deleted'
profile_photo_url (TEXT)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)

### Drivers Table
id (UUID)
user_id (UUID) - References users
license_number (VARCHAR) - Unique
license_expiry (DATE)
vehicle_type (VARCHAR) - 'motorbike', 'tuk-tuk'
vehicle_registration (VARCHAR)
vehicle_make (VARCHAR)
vehicle_model (VARCHAR)
vehicle_year (INT)
rating (FLOAT) - Default 0
total_rides (INT) - Default 0
approval_status (VARCHAR) - 'pending', 'approved', 'rejected', 'suspended'
documents_verified (BOOLEAN)
verified_at (TIMESTAMP)
bank_account_number (VARCHAR)
bank_name (VARCHAR)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)

### Driver Documents Table
id (UUID)
driver_id (UUID) - References drivers
document_type (VARCHAR) - 'license', 'insurance', 'registration', 'id_photo'
document_url (TEXT) - Supabase Storage URL
ocr_extracted_data (JSONB) - Data extracted from document
verified (BOOLEAN)
verified_by (UUID) - Admin who verified
verification_notes (TEXT)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)

### Bookings Table
id (UUID)
rider_id (UUID) - References users
driver_id (UUID) - References drivers (null until accepted)
pickup_lat (FLOAT)
pickup_long (FLOAT)
pickup_address (VARCHAR)
destination_lat (FLOAT)
destination_long (FLOAT)
destination_address (VARCHAR)
ride_type (VARCHAR) - 'standard', 'premium'
fare (FLOAT)
distance_km (FLOAT)
duration_minutes (INT)
status (VARCHAR) - 'pending', 'accepted', 'in_progress', 'completed', 'cancelled'
payment_method (VARCHAR) - 'cash', 'wallet', 'card'
payment_status (VARCHAR) - 'unpaid', 'paid'
cancellation_reason (TEXT)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
completed_at (TIMESTAMP)

### Ratings Table
id (UUID)
from_user_id (UUID) - Who rated
to_user_id (UUID) - Who was rated
ride_id (UUID) - References bookings
rating (INT) - 1-5
comment (TEXT)
created_at (TIMESTAMP)

### User Locations Table (Real-time)
id (UUID)
user_id (UUID) - Unique, updates existing record
latitude (FLOAT)
longitude (FLOAT)
accuracy (FLOAT)
updated_at (TIMESTAMP)

### Admin Approvals Log Table
id (UUID)
driver_id (UUID)
admin_id (UUID)
action (VARCHAR) - 'approved', 'rejected', 'suspended'
notes (TEXT)
created_at (TIMESTAMP)

### Promo Codes Table
id (UUID)
code (VARCHAR) - Unique
discount_type (VARCHAR) - 'percentage', 'fixed'
discount_value (FLOAT)
max_uses (INT)
uses_count (INT)
expiry_date (DATE)
active (BOOLEAN)
created_at (TIMESTAMP)

### Transactions Table
id (UUID)
booking_id (UUID)
driver_id (UUID)
amount (FLOAT) - Total fare
commission (FLOAT) - Platform commission
driver_earnings (FLOAT) - Amount to driver
payment_method (VARCHAR)
status (VARCHAR)
created_at (TIMESTAMP)

## Features

### Rider Features
- ✅ One-tap signup with phone OTP
- ✅ Real-time ride booking with fare estimate
- ✅ Live driver tracking on map
- ✅ Driver details (rating, vehicle, photo)
- ✅ In-app chat with driver
- ✅ Call driver button
- ✅ SOS emergency button
- ✅ Multiple payment methods
- ✅ Wallet system
- ✅ Promo code support
- ✅ Rating & reviews after ride
- ✅ Ride history
- ✅ Download receipt (PDF)
- ✅ Re-book favorite routes
- ✅ Multi-language support (EN, FR, AR)

### Driver Features
- ✅ Phone signup + OTP
- ✅ Document upload (auto-verify)
- ✅ Document auto-extraction with OCR
- ✅ Approval status tracking in real-time
- ✅ Email notifications on approval/rejection
- ✅ Go online/offline toggle
- ✅ Ride request notifications (sound + vibration)
- ✅ 10-second timer to accept ride
- ✅ Live navigation to pickup
- ✅ Live navigation to destination
- ✅ Real-time location sharing
- ✅ In-app chat with rider
- ✅ Earnings tracker (real-time)
- ✅ Daily/Weekly/Monthly earnings chart
- ✅ Per-ride breakdown
- ✅ Payout schedule
- ✅ Ride history
- ✅ Rating visibility
- ✅ Document re-verification reminder (yearly)

### Admin Features
- ✅ Dashboard with real-time metrics:
  - Total rides today
  - Active drivers online
  - Total revenue
  - Average ride rating
  - Commission earned
- ✅ Charts (Recharts):
  - Rides per hour
  - Revenue trend
  - Driver signup trend
  - Payment methods breakdown
- ✅ Driver Management:
  - List of unapproved drivers
  - Document preview
  - OCR extracted data display
  - Approve/Reject button
  - Add verification notes
  - Email auto-sent on decision
  - View approved drivers
  - Suspend drivers option
  - View driver documents
- ✅ Rider Management:
  - View all riders
  - Block suspicious accounts
  - View rider complaints
  - Ban user option
- ✅ Ride Monitoring:
  - Map with active drivers
  - List of ongoing rides
  - Completion %
  - ETA
  - Ride details modal
  - Cancel ride option
- ✅ Earnings Reports:
  - Commission breakdown
  - Driver payouts
  - Total revenue
  - Export to CSV
  - Date range filter
- ✅ Complaint Management:
  - Driver vs Rider complaints
  - Resolution status
  - Add notes
  - Contact driver/rider
- ✅ Promo Codes:
  - Create new codes
  - Edit existing codes
  - Track usage
  - View active/inactive
  - Set expiry dates
- ✅ Settings:
  - Commission percentage
  - Surge pricing rules
  - Base fare amount
  - Required documents
  - Peak hours timing

## UI Components (Reusable)

### Layout Components
- NavBar (with logo, language switcher, user menu)
- Sidebar (admin navigation)
- TabBar (rider/driver bottom navigation)
- Container (responsive wrapper)

### Map Components
- LiveMap (React-Leaflet with real-time markers)
- DriverLocations (show nearby drivers)
- RouteMap (pickup → destination with route)

### Card Components
- RideCard (show ride info)
- DriverCard (show driver info)
- StatsCard (admin dashboard metrics)
- DocumentCard (show document with verification status)
- UserCard (show user profile)

### Form Components
- PhoneInput (with country code selector)
- OTPInput (6-digit code)
- DestinationInput (with autocomplete)
- DocumentUploadForm (multi-file upload)
- BankDetailsForm (account, routing number)
- VehicleDetailsForm (make, model, year, registration)

### Modal Components
- ApprovalModal (admin approves driver)
- RejectionModal (admin rejects driver with reason)
- RideDetailsModal (show complete ride info)
- ConfirmDialog (generic confirmation)
- RatingModal (rate driver after ride)

### Button Components
- PrimaryButton (blue, main action)
- SecondaryButton (gray, alternative)
- DangerButton (red, destructive)
- LoadingButton (with spinner)

### Status Indicators
- ApprovalBadge (Pending/Approved/Rejected/Suspended)
- RatingStars (1-5 stars with count)
- OnlineStatus (driver is online/offline)
- PaymentStatusBadge (Paid/Unpaid)

### Notifications
- Toast (temporary notification)
- Alert (persistent message)
- SnackBar (bottom notification)

### Loading States
- SkeletonLoader (placeholder while loading)
- SpinnerOverlay (full-screen loading)
- ProgressBar (linear progress)

## File Structure
taxi-moto/
├── src/
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── PhoneSignup.jsx
│   │   │   ├── OTPVerification.jsx
│   │   │   ├── RoleSelection.jsx
│   │   │   └── LandingPage.jsx
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── DriverApproval.jsx
│   │   │   ├── RiderManagement.jsx
│   │   │   ├── RideMonitoring.jsx
│   │   │   ├── EarningsReport.jsx
│   │   │   ├── DocumentVerification.jsx
│   │   │   └── ComplaintsManagement.jsx
│   │   ├── rider/
│   │   │   ├── RiderDashboard.jsx
│   │   │   ├── RideBooking.jsx
│   │   │   ├── RideTracking.jsx
│   │   │   ├── RideHistory.jsx
│   │   │   ├── RiderProfile.jsx
│   │   │   └── Ratings.jsx
│   │   └── driver/
│   │       ├── DriverDashboard.jsx
│   │       ├── DriverOnboarding.jsx
│   │       ├── DocumentUpload.jsx
│   │       ├── DriverApprovalStatus.jsx
│   │       ├── IncomeTracker.jsx
│   │       ├── RideAcceptance.jsx
│   │       └── ActiveRide.jsx
│   ├── components/
│   │   ├── Maps/
│   │   ├── Cards/
│   │   ├── Forms/
│   │   ├── Modals/
│   │   ├── Navigation/
│   │   └── Utils/
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useLocationTracking.js
│   │   ├── useRideBooking.js
│   │   ├── useFareCalculation.js
│   │   ├── useRealtime.js
│   │   └── usePayment.js
│   ├── services/
│   │   ├── supabaseClient.js
│   │   ├── authService.js
│   │   ├── rideService.js
│   │   ├── driverService.js
│   │   ├── paymentService.js
│   │   ├── mapsService.js
│   │   └── notificationService.js
│   ├── stores/
│   │   └── appStore.js (Zustand)
│   ├── utils/
│   │   ├── validators.js
│   │   ├── geolocation.js
│   │   ├── fareCalculator.js
│   │   ├── constants.js
│   │   └── formatters.js
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .env.local
└── TAXI_MOTO_MASTER.md (this file)

## Code Standards

- Use functional components + React hooks
- Use Zustand for global state (not Context API)
- Use Tailwind CSS (not inline styles)
- Use Zod for form validation
- Handle all errors with try-catch
- Add loading and error states
- Make all components responsive
- Use proper TypeScript comments
- Add JSDoc for functions
- Use meaningful variable names
- Keep components under 200 lines
- Reuse components
- Follow React best practices

## Styling

- Tailwind CSS only
- Color scheme:
  - Primary: Blue (blue-600)
  - Secondary: Gray (gray-600)
  - Success: Green (green-600)
  - Danger: Red (red-600)
  - Warning: Yellow (yellow-600)
- Mobile-first approach
- Responsive breakpoints: sm, md, lg, xl
- Dark mode support (optional)

## Environment Variables
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
VITE_GOOGLE_MAPS_API_KEY=xxx (optional)
VITE_STRIPE_PUBLIC_KEY=xxx (optional)

## API Integration

- All CRUD operations through Supabase
- Real-time subscriptions for:
  - Ride status updates
  - Driver location updates
  - New ride requests
- Database constraints ensure data integrity
- Row-level security (RLS) policies for data privacy

## Testing Checklist

- [ ] Phone signup works
- [ ] OTP verification works
- [ ] Role selection saves
- [ ] Rider can book ride
- [ ] Driver sees ride request
- [ ] Driver can accept/reject
- [ ] Live tracking updates every 2 sec
- [ ] Ride completion works
- [ ] Rating works
- [ ] Receipt downloads
- [ ] Admin dashboard loads
- [ ] Driver approval flow works
- [ ] Documents upload
- [ ] Admin can approve driver
- [ ] Driver notification received
- [ ] Earnings tracker updates
- [ ] Real-time maps work
- [ ] Chat works
- [ ] All responsive on mobile

## Deployment Checklist

- [ ] All env vars set
- [ ] Database tables created
- [ ] Code builds without errors
- [ ] No console warnings
- [ ] All links work
- [ ] Mobile responsive
- [ ] Maps load
- [ ] Auth works
- [ ] Real-time works
- [ ] Vercel deployment successful

## Success Criteria

- ✅ App loads in < 3 seconds
- ✅ Booking takes < 30 seconds
- ✅ Live tracking updates < 2 seconds
- ✅ Mobile responsive
- ✅ Zero console errors
- ✅ All features work
- ✅ Production ready
- ✅ Deployed live
```