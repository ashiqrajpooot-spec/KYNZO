# Seller Approval System - Quick Start Guide

## For Sellers: Getting Approved

### Step 1: Register as a Seller
1. Go to `https://yoursite.com/seller/register`
2. Fill in your business information:
   - Email address
   - Password (8+ characters)
   - Business name
   - Product category
   - Phone number
   - Address, city, state, ZIP code
3. Click "Create Seller Account"
4. See confirmation: "Application Submitted Successfully!"

### Step 2: Wait for Admin Review
- Your application is now pending
- Admin will review within 24-48 hours
- You'll receive an email notification when approved or rejected

### Step 3: Login After Approval
1. Go to `https://yoursite.com/seller/login`
2. Enter your email and password
3. If approved, you'll be redirected to your dashboard
4. If still pending, you'll see: "Your application is being reviewed"
5. If rejected, you'll see the rejection reason

### Step 4: Access Your Dashboard
Once approved, visit `/seller/dashboard` to:
- View your products
- Add new products
- Check sales and analytics
- Manage settings

---

## For Admin: Reviewing Applications

### Step 1: Login to Admin Panel
1. Go to `https://yoursite.com/admin/login`
2. Email: `ASHIQRAJPOOOT@GMAIL.COM`
3. Password: Your configured admin password
4. Click "Sign In"

### Step 2: Access Seller Management
1. From admin dashboard, click "Manage Sellers" button
2. Or go directly to `/admin/sellers`

### Step 3: Review Applications
The Sellers page shows:
- **Stats**: Count of pending, approved, and rejected applications
- **Search**: Find sellers by email, business name, city, or phone
- **Filter**: View by pending, approved, rejected, or all

### Step 4: Approve a Seller
1. Find the seller in the pending list
2. Click the "Approve" button
3. Status changes to "Approved" immediately
4. Seller can now login and use their account

### Step 5: Reject a Seller
1. Find the seller in the pending list
2. Click the "Reject" button
3. A form appears asking for rejection reason
4. Enter reason (e.g., "Business license not valid", "Duplicate account", etc.)
5. Click "Confirm Rejection"
6. Seller will see this reason when attempting to login

---

## Dashboard Features

### Pending Applications Tab
- Shows all sellers waiting for approval
- Quick approve/reject buttons
- Most recent first

### Approved Tab
- Shows all approved sellers
- Can view their account details
- No actions available

### Rejected Tab
- Shows all rejected sellers
- Displays rejection reason
- No actions available

### Search Examples
- **By Email**: Type `seller@example.com`
- **By Business**: Type `Tech Store` or `Elec` (partial match)
- **By City**: Type `New York` or `NY`
- **By Phone**: Type `5551234567`

---

## Common Scenarios

### Scenario 1: New Seller Wants to Sell
```
Seller Action:
1. Register at /seller/register
2. Wait for approval

Admin Action:
1. Check /admin/sellers
2. Review business details
3. Click Approve
4. Seller receives confirmation and can login

Result: Seller access to /seller/dashboard
```

### Scenario 2: Seller Application Rejected
```
Admin Action:
1. Find seller in pending list
2. Click Reject
3. Enter reason: "Selling restricted items"
4. Click Confirm

Seller Action:
1. Try to login at /seller/login
2. See message: "Your application was rejected: Selling restricted items"
3. Contact support for more info

Result: Seller access denied until reapproval
```

### Scenario 3: Search for Specific Seller
```
Admin Action:
1. Go to /admin/sellers
2. Type seller's email in search: "john@business.com"
3. Results update instantly
4. See John's application details

Result: Found and can take action
```

---

## Data That's Stored

For each seller application, the system stores:
- Email address
- Business name
- Category (Electronics, Books, Fashion, etc.)
- Phone number
- Full address (street, city, state, ZIP)
- Status (pending/approved/rejected)
- Submission date
- Rejection reason (if rejected)
- Approval date (if approved)

---

## Troubleshooting

**Q: Seller can't login after I approved them?**
- Check that status shows "Approved" (not "Pending")
- Verify they're entering correct password
- Try clearing browser cache and refreshing

**Q: Search isn't finding a seller?**
- Make sure you're typing the exact value they entered
- Search is case-insensitive but requires partial match
- Try searching by different field (email, phone, city, etc.)

**Q: Where are the applications stored?**
- Currently in browser localStorage
- Data persists across sessions
- For production, connect to a database

**Q: Can a seller resubmit after rejection?**
- Not yet - this is a future enhancement
- Currently they need to contact admin for reconsideration

**Q: How long does approval take?**
- Depends on admin response
- Target: 24-48 hours
- You can check `/seller/login` to see current status

---

## Key URLs

| Page | URL | Who |
|------|-----|-----|
| Seller Registration | `/seller/register` | Sellers |
| Seller Login | `/seller/login` | Sellers |
| Seller Dashboard | `/seller/dashboard` | Approved Sellers |
| Admin Login | `/admin/login` | Admins |
| Admin Dashboard | `/admin` | Admins |
| Manage Sellers | `/admin/sellers` | Admins |

---

## Next Steps

1. **Test with a sample seller** - Register and verify the flow
2. **Set up email notifications** - Send approval/rejection emails
3. **Connect to database** - Replace localStorage with real DB
4. **Add seller categories** - Customize which categories you allow
5. **Implement appeals** - Allow sellers to appeal rejections

For more details, see `SELLER_APPROVAL_SYSTEM.md`
