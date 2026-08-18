# Seller Approval System - Complete Documentation

## Overview
The seller approval system enables admins to review and approve seller applications before they can access their dashboard. This ensures quality control and security for the ASH MART platform.

## Architecture

### 1. Seller Approval Context (`lib/seller-approval-context.tsx`)
Manages all seller applications and their statuses using React Context API with localStorage persistence.

**Key Features:**
- Store applications with statuses: `pending`, `approved`, `rejected`
- Add new applications from registration
- Approve/reject applications with admin actions
- Query applications by email or ID
- Check approval status (isPending, isApproved, isRejected)

**Data Structure:**
```typescript
interface SellerApplication {
  id: string                    // Unique ID (app_timestamp)
  email: string                 // Seller email
  businessName: string          // Business name
  category: string              // Product category
  phoneNumber: string           // Contact phone
  address: string               // Business address
  city: string                  // City
  state: string                 // State
  zipCode: string               // ZIP code
  password: string              // Encrypted password
  status: "pending" | "approved" | "rejected"
  createdAt: Date              // Application submission date
  approvedAt?: Date            // Approval date
  rejectionReason?: string     // Reason for rejection
}
```

### 2. Seller Registration Flow (`app/seller/register/page.tsx`)
Updated to submit applications for approval instead of auto-creating accounts.

**Changes:**
- Registration now creates a "pending" application
- Displays success message after submission
- Prevents duplicate applications
- Shows submission status to user
- Redirects to login after 2 seconds

### 3. Admin Sellers Management (`app/admin/sellers/page.tsx`)
New admin page for reviewing and managing seller applications.

**Features:**
- **Dashboard Stats**: Shows count of pending, approved, and rejected applications
- **Advanced Search**: Search by email, business name, city, or phone number
- **Status Filtering**: Filter by pending, approved, rejected, or all statuses
- **Quick Actions**: Approve or reject applications directly from list
- **Rejection Form**: Admin can provide rejection reasons
- **Responsive Design**: Works on mobile and desktop

**UI Components:**
- Stats cards with status counts
- Search bar with real-time filtering
- Tab-based filtering system
- Application cards with business details
- Inline approval/rejection buttons
- Rejection reason form with confirmation

### 4. Seller Login Status Checks (`app/seller/login/page.tsx`)
Enhanced login to check seller approval status.

**Login Flow:**
1. User enters email and password
2. System checks approval status:
   - **Pending**: Shows "Your application is being reviewed" message
   - **Rejected**: Shows rejection reason and blocks login
   - **Not Applied**: Directs to register
   - **Approved**: Allows login to proceed
3. If approved and credentials valid, redirects to dashboard

### 5. Admin Dashboard Link (`app/admin/page.tsx`)
Added quick access button to seller management page in admin dashboard.

## User Workflows

### Seller Registration & Approval Process

1. **Seller Registration:**
   - Visit `/seller/register`
   - Fill in business details (name, category, address, phone, etc.)
   - Set password
   - Submit application
   - See "Application Submitted" confirmation

2. **Admin Review (First Access):**
   - Admin logs in to `/admin`
   - Clicks "Manage Sellers" button
   - Sees all pending applications on `/admin/sellers`

3. **Admin Approval/Rejection:**
   - Admin reviews seller details
   - Clicks "Approve" to allow seller access
   - Or clicks "Reject" and provides reason
   - Toast notification confirms action
   - Application status updates in real-time

4. **Seller Login:**
   - Seller visits `/seller/login`
   - **If Pending**: Sees "Your application is being reviewed" message
   - **If Rejected**: Sees rejection reason (e.g., "Business license invalid")
   - **If Approved**: Can login with credentials and access dashboard
   - **If Not Applied**: Directed to register

## Search & Filter Features

### Search Capabilities
Search field filters applications by:
- Email address (partial match, case-insensitive)
- Business name (partial match, case-insensitive)
- City name (partial match, case-insensitive)
- Phone number (exact match)

### Filter Options
- **All**: Shows all applications
- **Pending (count)**: Only pending applications
- **Approved (count)**: Only approved applications  
- **Rejected (count)**: Only rejected applications

### Sorting
Applications are automatically sorted by submission date, newest first.

## Admin Actions

### Approve Seller
1. Locate seller in applications list
2. Click "Approve" button
3. Status changes to "approved" immediately
4. Toast notification: "Seller Approved - They can now access their dashboard"
5. Seller can now login and use their account

### Reject Seller
1. Locate seller in applications list
2. Click "Reject" button
3. Rejection form appears
4. Enter reason for rejection (required)
5. Click "Confirm Rejection"
6. Toast notification: "Seller Rejected"
7. Seller sees rejection reason when attempting login

## Data Storage

All seller applications are stored in browser's localStorage under key:
```
ashmart-seller-applications
```

**Format**: JSON array of SellerApplication objects with timestamps.

**Note**: For production, replace localStorage with a real database (PostgreSQL, MongoDB, etc.)

## Future Enhancements

1. **Backend Database**: Replace localStorage with persistent database
2. **Email Notifications**: Send automated emails to sellers (approval/rejection)
3. **Document Verification**: Upload and verify business licenses, tax IDs
4. **Multi-step Approval**: Add additional review stages
5. **Approval Limits**: Set max sellers per category
6. **Analytics**: Track approval rates, processing times
7. **Bulk Actions**: Approve/reject multiple sellers at once
8. **Comments**: Admins can leave feedback on applications
9. **Resubmission**: Allow sellers to resubmit rejected applications
10. **Seller Tiers**: Different approval levels (basic, premium, enterprise)

## Testing the System

### Test Scenario 1: New Seller Registration
1. Go to `/seller/register`
2. Fill in all required fields
3. Submit
4. Verify "Application Submitted" success message

### Test Scenario 2: Admin Approval
1. Login to admin at `/admin/login` (ASHIQRAJPOOOT@GMAIL.COM)
2. Click "Manage Sellers"
3. Search for the new seller's email
4. Click "Approve"
5. Verify status changes to "Approved"

### Test Scenario 3: Approved Seller Login
1. Go to `/seller/login`
2. Enter approved seller's credentials
3. Should redirect to `/seller/dashboard`

### Test Scenario 4: Pending Seller Login
1. Go to `/seller/login`
2. Enter pending seller's credentials
3. Should see "Your application is still being reviewed" message

### Test Scenario 5: Rejected Seller Login
1. Go to `/seller/login`
2. Enter rejected seller's credentials
3. Should see rejection reason

## API Reference

### useApproval Hook
```typescript
const {
  applications,                          // All applications
  addApplication,                        // Add new application
  approveApplication,                    // Approve by ID
  rejectApplication,                     // Reject with reason
  getApplicationById,                    // Get by ID
  getApplicationByEmail,                 // Get by email
  isApproved,                           // Check if approved
  isPending,                            // Check if pending
  isRejected,                           // Check if rejected
} = useApproval()
```

## Security Notes

1. **Password Storage**: Currently stored in localStorage - should be hashed on backend in production
2. **Authentication**: Admin login to `/admin` requires credentials
3. **Authorization**: Only approved sellers can access `/seller/dashboard`
4. **Input Validation**: Email, phone, required fields validated on client
5. **CORS**: Should implement proper CORS policies on production backend

## Troubleshooting

**Problem**: Applications not persisting after refresh
- **Solution**: Ensure localStorage is enabled in browser

**Problem**: Seller can't login after approval
- **Solution**: Verify email/password match what was submitted; check if status shows "approved"

**Problem**: Admin can't see sellers page
- **Solution**: Verify logged in to `/admin` and not just seller account

**Problem**: Search not finding sellers
- **Solution**: Use exact values from form; search is case-insensitive but requires partial match

## Files Modified/Created

- ✅ Created: `lib/seller-approval-context.tsx`
- ✅ Created: `app/admin/sellers/page.tsx`
- ✅ Modified: `app/seller/register/page.tsx`
- ✅ Modified: `app/seller/login/page.tsx`
- ✅ Modified: `app/admin/page.tsx`
- ✅ Modified: `components/providers.tsx`
