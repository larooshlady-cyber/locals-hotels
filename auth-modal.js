/**
 * Locals' Hotels — Auth Modal System
 * Self-contained: injects CSS + HTML + binds all events.
 * Usage: <script src="auth-modal.js"></script> before </body>
 *
 * API:
 *   AuthModal.open('signup')   — opens sign-up screen
 *   AuthModal.open('signin')   — opens sign-in screen
 *   AuthModal.open('forgot')   — opens forgot-password flow
 *   AuthModal.open('terms')    — opens terms & conditions
 *   AuthModal.open('privacy')  — opens privacy policy
 *   AuthModal.close()          — closes modal
 */
(function () {
  'use strict';

  /* ============================================================
     1. CSS
     ============================================================ */
  var css = document.createElement('style');
  css.textContent = [

    /* Overlay */
    '.am-overlay{position:fixed;inset:0;z-index:9999;background:rgba(33,37,41,.55);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:24px;opacity:0;transition:opacity .3s ease}',
    '.am-overlay.active{display:flex}',
    '.am-overlay.visible{opacity:1}',

    /* Container */
    '.am-container{background:#fff;border-radius:12px;width:100%;max-width:480px;max-height:calc(100vh - 48px);overflow-y:auto;position:relative;transform:translateY(16px) scale(.98);transition:transform .35s cubic-bezier(.25,.46,.45,.94),opacity .3s;opacity:0;scrollbar-width:thin;scrollbar-color:#CED4DA transparent}',
    '.am-overlay.visible .am-container{transform:translateY(0) scale(1);opacity:1}',
    '.am-container::-webkit-scrollbar{width:4px}',
    '.am-container::-webkit-scrollbar-thumb{background:#CED4DA;border-radius:4px}',

    /* Close btn */
    '.am-close{position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#495057;background:none;border:none;cursor:pointer;transition:all .2s;z-index:2}',
    '.am-close:hover{background:#F8F9FA;color:#212529}',
    '.am-close svg{width:18px;height:18px}',

    /* Screens */
    '.am-screen{display:none;padding:48px 40px 40px}',
    '.am-screen.active{display:block}',

    /* Typography */
    '.am-label-top{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ADB5BD;margin-bottom:8px}',
    '.am-title{font-size:26px;font-weight:800;color:#212529;margin-bottom:8px;letter-spacing:-.3px}',
    '.am-subtitle{font-size:14px;color:#677078;line-height:1.5;margin-bottom:32px}',
    '.am-subtitle a{color:#212529;font-weight:600;border-bottom:1px solid #CED4DA;transition:border-color .2s;cursor:pointer}',
    '.am-subtitle a:hover{border-color:#212529}',

    /* Social */
    '.am-social{display:flex;gap:12px;margin-bottom:28px}',
    '.am-social-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:10px;padding:12px 16px;border:1px solid #CED4DA;border-radius:10px;font-family:inherit;font-size:13px;font-weight:600;color:#212529;background:#fff;cursor:pointer;transition:all .25s}',
    '.am-social-btn:hover{background:#F8F9FA;border-color:#ADB5BD;transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,.06)}',
    '.am-social-btn:active{transform:translateY(0);box-shadow:none}',
    '.am-social-btn svg{width:18px;height:18px;flex-shrink:0}',

    /* Divider */
    '.am-divider{display:flex;align-items:center;gap:16px;margin-bottom:24px}',
    '.am-divider::before,.am-divider::after{content:"";flex:1;height:1px;background:#CED4DA}',
    '.am-divider span{font-size:11px;font-weight:600;color:#ADB5BD;letter-spacing:.5px;text-transform:uppercase}',

    /* Fields */
    '.am-field{margin-bottom:18px}',
    '.am-field-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
    '.am-field label{display:block;font-size:12px;font-weight:600;color:#212529;margin-bottom:6px}',
    '.am-input-wrap{position:relative}',
    '.am-input{width:100%;padding:12px 16px;font-family:inherit;font-size:14px;color:#212529;background:#F8F9FA;border:1.5px solid transparent;border-radius:10px;outline:none;transition:all .25s}',
    '.am-input::placeholder{color:#ADB5BD}',
    '.am-input:focus{background:#fff;border-color:#212529;box-shadow:0 0 0 3px rgba(33,37,41,.08)}',
    '.am-input--error{border-color:#A22522!important;background:#fef7f7!important}',
    '.am-field-error{font-size:12px;color:#A22522;margin-top:6px;display:none}',
    '.am-field-error.visible{display:block}',

    /* Toggle pw */
    '.am-toggle-pw{position:absolute;right:14px;top:50%;transform:translateY(-50%);color:#ADB5BD;cursor:pointer;padding:4px;border:none;background:none;transition:color .2s}',
    '.am-toggle-pw:hover{color:#212529}',
    '.am-toggle-pw svg{width:18px;height:18px}',

    /* PW strength */
    '.am-pw-strength{display:flex;gap:4px;margin-top:8px}',
    '.am-pw-bar{flex:1;height:3px;border-radius:2px;background:#CED4DA;transition:background .3s}',
    '.am-pw-bar.weak{background:#A22522}',
    '.am-pw-bar.medium{background:#e09f3e}',
    '.am-pw-bar.strong{background:#386641}',
    '.am-pw-label{font-size:11px;color:#ADB5BD;margin-top:4px}',

    /* Checkbox */
    '.am-checkbox-wrap{display:flex;align-items:flex-start;gap:10px;margin-bottom:24px}',
    '.am-checkbox{width:18px;height:18px;border:1.5px solid #CED4DA;border-radius:5px;background:#fff;cursor:pointer;flex-shrink:0;margin-top:1px;-webkit-appearance:none;appearance:none;display:flex;align-items:center;justify-content:center;transition:all .2s}',
    '.am-checkbox:checked{background:#212529;border-color:#212529}',
    '.am-checkbox:checked::after{content:"";display:block;width:5px;height:9px;border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg);margin-bottom:2px}',
    '.am-checkbox-label{font-size:13px;color:#677078;line-height:1.5}',
    '.am-checkbox-label a{color:#212529;font-weight:600;border-bottom:1px solid #CED4DA;cursor:pointer;transition:border-color .2s}',
    '.am-checkbox-label a:hover{border-color:#212529}',

    /* Options row */
    '.am-options{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}',
    '.am-remember{display:flex;align-items:center;gap:8px}',
    '.am-remember-label{font-size:13px;color:#677078;cursor:pointer}',
    '.am-forgot-link{font-size:13px;font-weight:600;color:#212529;border-bottom:1px solid #CED4DA;cursor:pointer;background:none;border-top:none;border-left:none;border-right:none;padding:0;font-family:inherit;transition:border-color .2s}',
    '.am-forgot-link:hover{border-bottom-color:#212529}',

    /* Submit */
    '.am-submit{width:100%;padding:14px 24px;background:#212529;color:#fff;font-family:inherit;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border:none;border-radius:10px;cursor:pointer;transition:all .25s;position:relative;overflow:hidden}',
    '.am-submit:hover{background:#000;transform:translateY(-1px);box-shadow:0 6px 20px rgba(0,0,0,.2)}',
    '.am-submit:active{transform:translateY(0) scale(.98);box-shadow:none}',
    '.am-submit:disabled{opacity:.5;cursor:not-allowed;transform:none!important;box-shadow:none!important}',

    /* Back link */
    '.am-back{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:600;color:#677078;margin-bottom:24px;cursor:pointer;background:none;border:none;padding:0;font-family:inherit;transition:color .2s}',
    '.am-back:hover{color:#212529}',
    '.am-back svg{width:16px;height:16px}',

    /* Icon box */
    '.am-icon{width:52px;height:52px;border-radius:12px;background:#F8F9FA;display:flex;align-items:center;justify-content:center;margin-bottom:24px;color:#212529}',
    '.am-icon svg{width:22px;height:22px}',
    '.am-icon--success{background:#e8f5e9;color:#386641}',

    /* Code inputs */
    '.am-code-wrap{display:flex;gap:10px;justify-content:center;margin-bottom:24px}',
    '.am-code-input{width:48px;height:52px;text-align:center;font-family:inherit;font-size:22px;font-weight:700;color:#212529;background:#F8F9FA;border:1.5px solid transparent;border-radius:10px;outline:none;transition:all .25s}',
    '.am-code-input:focus{background:#fff;border-color:#212529;box-shadow:0 0 0 3px rgba(33,37,41,.08)}',
    '.am-code-input--error{border-color:#A22522!important;background:#fef7f7!important}',

    /* Resend */
    '.am-resend{text-align:center;font-size:13px;color:#677078;margin-top:20px}',
    '.am-resend a{color:#212529;font-weight:600;border-bottom:1px solid #CED4DA;cursor:pointer}',
    '.am-resend a:hover{border-bottom-color:#212529}',

    /* Success */
    '.am-success-msg{text-align:center;padding:20px 0}',
    '.am-success-msg .am-icon{margin:0 auto 24px}',

    /* Terms/Privacy long text */
    '.am-legal{padding:48px 40px 40px}',
    '.am-legal h1{font-size:22px;font-weight:800;color:#212529;margin-bottom:6px}',
    '.am-legal .am-legal-date{font-size:12px;color:#ADB5BD;margin-bottom:28px}',
    '.am-legal h2{font-size:15px;font-weight:700;color:#212529;margin:24px 0 8px}',
    '.am-legal p,.am-legal li{font-size:13.5px;line-height:1.7;color:#495057;margin-bottom:10px}',
    '.am-legal ul{padding-left:20px;margin-bottom:14px}',
    '.am-legal li{list-style:disc;margin-bottom:6px}',

    /* Mobile */
    '@media(max-width:768px){',
    '  .am-container{max-width:100%;border-radius:12px 12px 0 0;max-height:90vh;align-self:flex-end}',
    '  .am-screen{padding:40px 24px 32px}',
    '  .am-legal{padding:40px 24px 32px}',
    '  .am-title{font-size:22px}',
    '  .am-social{flex-direction:column}',
    '  .am-field-row{grid-template-columns:1fr}',
    '  .am-code-input{width:42px;height:46px;font-size:18px}',
    '}'

  ].join('\n');
  document.head.appendChild(css);

  /* ============================================================
     2. SVG ICONS (reused)
     ============================================================ */
  var ICON = {
    close:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    back:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>',
    eye:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
    lock:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    mail:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    shield:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    check:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    google:   '<svg viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>',
    apple:    '<svg viewBox="0 0 814 1000"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.5-81.5-105.9-207.7-105.9-328.2 0-192.8 125.4-295.2 248.6-295.2 65.3 0 119.9 43.6 161 43.6 39.5 0 101.1-46.2 176.3-46.2 28.5 0 130.9 2.6 198.3 99.6zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8.6 15.6 1.3 18.2 2.6.6 6.5 1.3 10.4 1.3 45.5 0 103.1-30.4 139.3-71.4z" fill="currentColor"/></svg>'
  };

  /* ============================================================
     3. HTML TEMPLATE
     ============================================================ */
  var overlay = document.createElement('div');
  overlay.className = 'am-overlay';
  overlay.id = 'authModal';
  overlay.innerHTML =
    '<div class="am-container">' +
      '<button class="am-close" id="amClose">' + ICON.close + '</button>' +

      /* ---- SIGN UP ---- */
      '<div class="am-screen" id="amSignup">' +
        '<div class="am-label-top">Create account</div>' +
        '<h1 class="am-title">Become a Local</h1>' +
        '<p class="am-subtitle">Already have an account? <a data-am-go="signin">Sign in</a></p>' +
        '<div class="am-social">' +
          '<button class="am-social-btn" type="button">' + ICON.google + ' Google</button>' +
          '<button class="am-social-btn" type="button">' + ICON.apple + ' Apple</button>' +
        '</div>' +
        '<div class="am-divider"><span>or continue with email</span></div>' +
        '<form id="amSignupForm" novalidate>' +
          '<div class="am-field am-field-row">' +
            '<div><label>First Name</label><input type="text" class="am-input" id="amSuFirst" placeholder="John" autocomplete="given-name"><div class="am-field-error" id="amSuFirstErr">First name is required</div></div>' +
            '<div><label>Last Name</label><input type="text" class="am-input" id="amSuLast" placeholder="Doe" autocomplete="family-name"><div class="am-field-error" id="amSuLastErr">Last name is required</div></div>' +
          '</div>' +
          '<div class="am-field"><label>Email</label><input type="email" class="am-input" id="amSuEmail" placeholder="john@example.com" autocomplete="email"><div class="am-field-error" id="amSuEmailErr">Please enter a valid email</div></div>' +
          '<div class="am-field"><label>Password</label><div class="am-input-wrap"><input type="password" class="am-input" id="amSuPw" placeholder="At least 8 characters" autocomplete="new-password" style="padding-right:44px"><button type="button" class="am-toggle-pw" data-am-toggle="amSuPw">' + ICON.eye + '</button></div><div class="am-pw-strength"><div class="am-pw-bar" id="amPwBar0"></div><div class="am-pw-bar" id="amPwBar1"></div><div class="am-pw-bar" id="amPwBar2"></div><div class="am-pw-bar" id="amPwBar3"></div></div><div class="am-pw-label" id="amPwLabel"></div><div class="am-field-error" id="amSuPwErr">Password must be at least 8 characters</div></div>' +
          '<div class="am-checkbox-wrap"><input type="checkbox" class="am-checkbox" id="amSuTerms"><label class="am-checkbox-label" for="amSuTerms">I agree to the <a data-am-go="terms">Terms of Service</a> and <a data-am-go="privacy">Privacy Policy</a></label></div>' +
          '<button type="submit" class="am-submit">Create Account</button>' +
        '</form>' +
      '</div>' +

      /* ---- SIGN UP SUCCESS ---- */
      '<div class="am-screen" id="amSignupOk">' +
        '<div class="am-success-msg">' +
          '<div class="am-icon am-icon--success">' + ICON.check + '</div>' +
          '<h1 class="am-title">Welcome to Locals\'</h1>' +
          '<p class="am-subtitle" style="margin-bottom:28px">Your account has been created. Check your email to verify your account and start discovering Georgia\'s best boutique hotels.</p>' +
          '<button class="am-submit" data-am-go="signin">Continue to Sign In</button>' +
        '</div>' +
      '</div>' +

      /* ---- SIGN IN ---- */
      '<div class="am-screen" id="amSignin">' +
        '<div class="am-label-top">Welcome back</div>' +
        '<h1 class="am-title">Sign In</h1>' +
        '<p class="am-subtitle">Don\'t have an account? <a data-am-go="signup">Become a Local</a></p>' +
        '<div class="am-social">' +
          '<button class="am-social-btn" type="button">' + ICON.google + ' Google</button>' +
          '<button class="am-social-btn" type="button">' + ICON.apple + ' Apple</button>' +
        '</div>' +
        '<div class="am-divider"><span>or continue with email</span></div>' +
        '<form id="amSigninForm" novalidate>' +
          '<div class="am-field"><label>Email</label><input type="email" class="am-input" id="amSiEmail" placeholder="john@example.com" autocomplete="email"><div class="am-field-error" id="amSiEmailErr">Please enter a valid email</div></div>' +
          '<div class="am-field"><label>Password</label><div class="am-input-wrap"><input type="password" class="am-input" id="amSiPw" placeholder="Enter your password" autocomplete="current-password" style="padding-right:44px"><button type="button" class="am-toggle-pw" data-am-toggle="amSiPw">' + ICON.eye + '</button></div><div class="am-field-error" id="amSiPwErr">Password is required</div></div>' +
          '<div class="am-options"><label class="am-remember"><input type="checkbox" class="am-checkbox" checked> <span class="am-remember-label">Remember me</span></label><button type="button" class="am-forgot-link" data-am-go="forgot">Forgot password?</button></div>' +
          '<button type="submit" class="am-submit">Sign In</button>' +
        '</form>' +
      '</div>' +

      /* ---- SIGN IN SUCCESS ---- */
      '<div class="am-screen" id="amSigninOk">' +
        '<div class="am-success-msg">' +
          '<div class="am-icon am-icon--success">' + ICON.check + '</div>' +
          '<h1 class="am-title">Welcome Back!</h1>' +
          '<p class="am-subtitle" style="margin-bottom:28px">You\'re signed in. Enjoy member rates and personalized recommendations.</p>' +
          '<button class="am-submit" id="amSigninOkClose">Continue Browsing</button>' +
        '</div>' +
      '</div>' +

      /* ---- FORGOT: Step 1 (email) ---- */
      '<div class="am-screen" id="amForgot1">' +
        '<button class="am-back" data-am-go="signin">' + ICON.back + ' Back to Sign In</button>' +
        '<div class="am-icon">' + ICON.lock + '</div>' +
        '<h1 class="am-title">Forgot your password?</h1>' +
        '<p class="am-subtitle">Enter the email associated with your account and we\'ll send a verification code.</p>' +
        '<form id="amForgot1Form" novalidate>' +
          '<div class="am-field"><label>Email address</label><input type="email" class="am-input" id="amFgEmail" placeholder="john@example.com" autocomplete="email"><div class="am-field-error" id="amFgEmailErr">Please enter a valid email</div></div>' +
          '<button type="submit" class="am-submit">Send Reset Code</button>' +
        '</form>' +
      '</div>' +

      /* ---- FORGOT: Step 2 (code) ---- */
      '<div class="am-screen" id="amForgot2">' +
        '<button class="am-back" data-am-go="forgot1">' + ICON.back + ' Back</button>' +
        '<div class="am-icon">' + ICON.mail + '</div>' +
        '<h1 class="am-title">Check your email</h1>' +
        '<p class="am-subtitle">We sent a 6-digit code to <strong id="amFgEmailShow"></strong>. Enter it below.</p>' +
        '<form id="amForgot2Form" novalidate>' +
          '<div class="am-code-wrap">' +
            '<input type="text" class="am-code-input" maxlength="1" inputmode="numeric" data-ci="0">' +
            '<input type="text" class="am-code-input" maxlength="1" inputmode="numeric" data-ci="1">' +
            '<input type="text" class="am-code-input" maxlength="1" inputmode="numeric" data-ci="2">' +
            '<input type="text" class="am-code-input" maxlength="1" inputmode="numeric" data-ci="3">' +
            '<input type="text" class="am-code-input" maxlength="1" inputmode="numeric" data-ci="4">' +
            '<input type="text" class="am-code-input" maxlength="1" inputmode="numeric" data-ci="5">' +
          '</div>' +
          '<div class="am-field-error" id="amCodeErr" style="text-align:center;margin-bottom:16px">Invalid code. Please try again.</div>' +
          '<button type="submit" class="am-submit">Verify Code</button>' +
        '</form>' +
        '<div class="am-resend" id="amResendArea">Didn\'t receive the code? <span id="amResendTimer">Resend in 30s</span></div>' +
      '</div>' +

      /* ---- FORGOT: Step 3 (new pw) ---- */
      '<div class="am-screen" id="amForgot3">' +
        '<div class="am-icon">' + ICON.shield + '</div>' +
        '<h1 class="am-title">Create new password</h1>' +
        '<p class="am-subtitle">Must be at least 8 characters and different from your previous password.</p>' +
        '<form id="amForgot3Form" novalidate>' +
          '<div class="am-field"><label>New Password</label><div class="am-input-wrap"><input type="password" class="am-input" id="amNewPw" placeholder="At least 8 characters" autocomplete="new-password" style="padding-right:44px"><button type="button" class="am-toggle-pw" data-am-toggle="amNewPw">' + ICON.eye + '</button></div><div class="am-pw-strength"><div class="am-pw-bar" id="amNpBar0"></div><div class="am-pw-bar" id="amNpBar1"></div><div class="am-pw-bar" id="amNpBar2"></div><div class="am-pw-bar" id="amNpBar3"></div></div><div class="am-pw-label" id="amNpLabel"></div><div class="am-field-error" id="amNewPwErr">Password must be at least 8 characters</div></div>' +
          '<div class="am-field"><label>Confirm Password</label><div class="am-input-wrap"><input type="password" class="am-input" id="amConfirmPw" placeholder="Repeat new password" autocomplete="new-password" style="padding-right:44px"><button type="button" class="am-toggle-pw" data-am-toggle="amConfirmPw">' + ICON.eye + '</button></div><div class="am-field-error" id="amConfirmPwErr">Passwords do not match</div></div>' +
          '<button type="submit" class="am-submit">Reset Password</button>' +
        '</form>' +
      '</div>' +

      /* ---- FORGOT: Step 4 (success) ---- */
      '<div class="am-screen" id="amForgotOk">' +
        '<div class="am-success-msg">' +
          '<div class="am-icon am-icon--success">' + ICON.check + '</div>' +
          '<h1 class="am-title">Password reset!</h1>' +
          '<p class="am-subtitle" style="margin-bottom:28px">Your password has been reset. You can now sign in with your new password.</p>' +
          '<button class="am-submit" data-am-go="signin">Back to Sign In</button>' +
        '</div>' +
      '</div>' +

      /* ---- TERMS & CONDITIONS ---- */
      '<div class="am-screen am-legal" id="amTerms">' +
        '<button class="am-back" data-am-go="signup">' + ICON.back + ' Back</button>' +
        '<h1>Terms of Service</h1>' +
        '<div class="am-legal-date">Last updated: March 1, 2025</div>' +

        '<h2>1. Acceptance of Terms</h2>' +
        '<p>By creating an account or using the Locals\' Hotels platform ("Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>' +

        '<h2>2. Account Registration</h2>' +
        '<p>To access member features, you must create an account with accurate and complete information. You are responsible for:</p>' +
        '<ul><li>Maintaining the confidentiality of your login credentials</li><li>All activities that occur under your account</li><li>Notifying us immediately of any unauthorized use</li></ul>' +

        '<h2>3. Booking & Reservations</h2>' +
        '<p>Locals\' Hotels acts as an intermediary between you and hotel properties. All bookings are subject to:</p>' +
        '<ul><li>Availability at the time of confirmation</li><li>The individual hotel\'s cancellation and modification policies</li><li>Accurate guest information provided during booking</li></ul>' +
        '<p>Prices displayed are per room per night unless otherwise stated and may be subject to local taxes and service fees.</p>' +

        '<h2>4. Member Benefits & Pricing</h2>' +
        '<p>Registered members may access special rates, early access to new properties, and personalized recommendations. Member pricing is non-transferable and available only to the registered account holder.</p>' +

        '<h2>5. User Conduct</h2>' +
        '<p>You agree not to:</p>' +
        '<ul><li>Use the Service for any unlawful purpose</li><li>Attempt to gain unauthorized access to any part of the Service</li><li>Interfere with the proper functioning of the platform</li><li>Misrepresent your identity or affiliation</li></ul>' +

        '<h2>6. Intellectual Property</h2>' +
        '<p>All content on Locals\' Hotels — including text, photographs, logos, and design — is owned by or licensed to Locals\' Hotels and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without written permission.</p>' +

        '<h2>7. Limitation of Liability</h2>' +
        '<p>Locals\' Hotels is not liable for any direct, indirect, or consequential damages arising from your use of the Service or your stay at any partner hotel. Our liability is limited to the amount paid for the specific booking in question.</p>' +

        '<h2>8. Changes to Terms</h2>' +
        '<p>We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance. We will notify registered users of material changes via email.</p>' +

        '<h2>9. Contact</h2>' +
        '<p>For questions regarding these Terms, contact us at <strong>legal@localshotels.com</strong> or through our <a href="contact.html" style="color:#212529;text-decoration:underline">Contact page</a>.</p>' +
      '</div>' +

      /* ---- PRIVACY POLICY ---- */
      '<div class="am-screen am-legal" id="amPrivacy">' +
        '<button class="am-back" data-am-go="signup">' + ICON.back + ' Back</button>' +
        '<h1>Privacy Policy</h1>' +
        '<div class="am-legal-date">Last updated: March 1, 2025</div>' +

        '<h2>1. Information We Collect</h2>' +
        '<p>When you create an account or make a booking, we collect:</p>' +
        '<ul><li><strong>Personal information:</strong> name, email address, phone number</li><li><strong>Booking data:</strong> travel dates, hotel preferences, guest count</li><li><strong>Usage data:</strong> pages visited, search queries, device information</li><li><strong>Payment information:</strong> processed securely through our payment partner; we do not store card details</li></ul>' +

        '<h2>2. How We Use Your Information</h2>' +
        '<p>We use collected data to:</p>' +
        '<ul><li>Process and manage your bookings</li><li>Provide personalized hotel recommendations</li><li>Send booking confirmations and travel updates</li><li>Improve our platform and user experience</li><li>Communicate promotional offers (with your consent)</li></ul>' +

        '<h2>3. Data Sharing</h2>' +
        '<p>We share your information only with:</p>' +
        '<ul><li><strong>Partner hotels:</strong> necessary booking details to fulfill your reservation</li><li><strong>Service providers:</strong> payment processors, email services, and analytics tools that help us operate</li><li><strong>Legal requirements:</strong> when required by law or to protect our rights</li></ul>' +
        '<p>We never sell your personal data to third parties.</p>' +

        '<h2>4. Data Security</h2>' +
        '<p>We implement industry-standard security measures including encryption, secure servers, and regular security audits. However, no method of transmission over the Internet is 100% secure.</p>' +

        '<h2>5. Your Rights</h2>' +
        '<p>You have the right to:</p>' +
        '<ul><li>Access the personal data we hold about you</li><li>Request correction of inaccurate data</li><li>Request deletion of your account and associated data</li><li>Opt out of marketing communications at any time</li><li>Export your data in a portable format</li></ul>' +

        '<h2>6. Cookies</h2>' +
        '<p>We use essential cookies for site functionality and optional analytics cookies to understand usage patterns. You can manage cookie preferences through your browser settings.</p>' +

        '<h2>7. Contact</h2>' +
        '<p>For privacy-related inquiries, contact our Data Protection team at <strong>privacy@localshotels.com</strong>.</p>' +
      '</div>' +

    '</div>'; // .am-container

  document.body.appendChild(overlay);

  /* ============================================================
     4. HELPERS
     ============================================================ */
  var $ = function (id) { return document.getElementById(id); };
  var screens = overlay.querySelectorAll('.am-screen');

  function show(id) {
    screens.forEach(function (s) { s.classList.remove('active'); });
    var el = $(id);
    if (el) { el.classList.add('active'); overlay.scrollTop = 0; el.closest('.am-container').scrollTop = 0; }
  }

  var screenMap = {
    signup:  'amSignup',
    signin:  'amSignin',
    forgot:  'amForgot1',
    forgot1: 'amForgot1',
    forgot2: 'amForgot2',
    forgot3: 'amForgot3',
    terms:   'amTerms',
    privacy: 'amPrivacy'
  };

  function openModal(screen) {
    show(screenMap[screen] || 'amSignup');
    overlay.classList.add('active');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { overlay.classList.add('visible'); });
    });
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('visible');
    setTimeout(function () {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      resetForms();
    }, 300);
  }

  function resetForms() {
    overlay.querySelectorAll('.am-input').forEach(function (i) { i.value = ''; i.classList.remove('am-input--error'); });
    overlay.querySelectorAll('.am-field-error').forEach(function (e) { e.classList.remove('visible'); });
    overlay.querySelectorAll('.am-pw-bar').forEach(function (b) { b.className = 'am-pw-bar'; });
    overlay.querySelectorAll('.am-pw-label').forEach(function (l) { l.textContent = ''; });
    overlay.querySelectorAll('.am-code-input').forEach(function (c) { c.value = ''; c.classList.remove('am-code-input--error'); });
    overlay.querySelectorAll('.am-submit').forEach(function (b) { b.disabled = false; });
    // reset button text
    var f = $('amSignupForm'); if (f) f.querySelector('.am-submit').textContent = 'Create Account';
    var s = $('amSigninForm'); if (s) s.querySelector('.am-submit').textContent = 'Sign In';
  }

  /* Public API */
  window.AuthModal = { open: openModal, close: closeModal };

  /* ============================================================
     5. EVENT BINDINGS
     ============================================================ */

  /* Close */
  $('amClose').addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
  });

  /* data-am-go navigation links */
  overlay.addEventListener('click', function (e) {
    var go = e.target.closest('[data-am-go]');
    if (!go) return;
    e.preventDefault();
    var target = go.getAttribute('data-am-go');
    if (screenMap[target]) show(screenMap[target]);
  });

  /* Continue browsing btn */
  var okClose = $('amSigninOkClose');
  if (okClose) okClose.addEventListener('click', closeModal);

  /* Toggle password visibility */
  overlay.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-am-toggle]');
    if (!btn) return;
    var input = $(btn.getAttribute('data-am-toggle'));
    if (!input) return;
    var isPw = input.type === 'password';
    input.type = isPw ? 'text' : 'password';
    btn.innerHTML = isPw ? ICON.eyeOff : ICON.eye;
  });

  /* Password strength meter */
  function pwStrength(inputId, barPrefix, labelId) {
    var input = $(inputId);
    if (!input) return;
    input.addEventListener('input', function () {
      var pw = input.value, score = 0;
      if (pw.length >= 8) score++;
      if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
      if (/\d/.test(pw)) score++;
      if (/[^a-zA-Z0-9]/.test(pw)) score++;
      var cls = score <= 1 ? 'weak' : score <= 2 ? 'medium' : 'strong';
      var labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
      for (var i = 0; i < 4; i++) {
        var bar = $(barPrefix + i);
        if (bar) { bar.className = 'am-pw-bar'; if (i < score && pw.length > 0) bar.classList.add(cls); }
      }
      var lbl = $(labelId);
      if (lbl) { lbl.textContent = pw.length > 0 ? (labels[score] || '') : ''; lbl.style.color = score <= 1 ? '#A22522' : score <= 2 ? '#e09f3e' : '#386641'; }
    });
  }
  pwStrength('amSuPw', 'amPwBar', 'amPwLabel');
  pwStrength('amNewPw', 'amNpBar', 'amNpLabel');

  /* Clear errors on input */
  overlay.querySelectorAll('.am-input').forEach(function (input) {
    input.addEventListener('input', function () {
      input.classList.remove('am-input--error');
      var err = input.parentElement.querySelector('.am-field-error') ||
                input.closest('.am-field').querySelector('.am-field-error');
      if (err) err.classList.remove('visible');
    });
  });

  /* Validation helpers */
  function showErr(inputId, errId) {
    var i = $(inputId), e = $(errId);
    if (i) i.classList.add('am-input--error');
    if (e) e.classList.add('visible');
  }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  /* ---- SIGN UP FORM ---- */
  $('amSignupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    var first = $('amSuFirst').value.trim();
    var last = $('amSuLast').value.trim();
    var email = $('amSuEmail').value.trim();
    var pw = $('amSuPw').value;
    var terms = $('amSuTerms').checked;

    if (!first) { showErr('amSuFirst', 'amSuFirstErr'); ok = false; }
    if (!last) { showErr('amSuLast', 'amSuLastErr'); ok = false; }
    if (!email || !validEmail(email)) { showErr('amSuEmail', 'amSuEmailErr'); ok = false; }
    if (!pw || pw.length < 8) { showErr('amSuPw', 'amSuPwErr'); ok = false; }
    if (!terms) { alert('Please accept the Terms of Service and Privacy Policy.'); ok = false; }
    if (!ok) return;

    var btn = this.querySelector('.am-submit');
    btn.disabled = true; btn.textContent = 'Creating Account...';
    setTimeout(function () { show('amSignupOk'); }, 1200);
  });

  /* ---- SIGN IN FORM ---- */
  $('amSigninForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    var email = $('amSiEmail').value.trim();
    var pw = $('amSiPw').value;

    if (!email || !validEmail(email)) { showErr('amSiEmail', 'amSiEmailErr'); ok = false; }
    if (!pw) { showErr('amSiPw', 'amSiPwErr'); ok = false; }
    if (!ok) return;

    var btn = this.querySelector('.am-submit');
    btn.disabled = true; btn.textContent = 'Signing In...';
    setTimeout(function () { show('amSigninOk'); }, 1000);
  });

  /* ---- FORGOT STEP 1 ---- */
  var forgotEmail = '';
  $('amForgot1Form').addEventListener('submit', function (e) {
    e.preventDefault();
    var email = $('amFgEmail').value.trim();
    if (!email || !validEmail(email)) { showErr('amFgEmail', 'amFgEmailErr'); return; }
    forgotEmail = email;

    var btn = this.querySelector('.am-submit');
    btn.disabled = true; btn.textContent = 'Sending...';
    setTimeout(function () {
      btn.disabled = false; btn.textContent = 'Send Reset Code';
      $('amFgEmailShow').textContent = email;
      show('amForgot2');
      startResend();
      var first = overlay.querySelector('#amForgot2 .am-code-input');
      if (first) first.focus();
    }, 1000);
  });

  /* ---- FORGOT STEP 2 (code) ---- */
  var codeInputs = overlay.querySelectorAll('.am-code-input');
  codeInputs.forEach(function (inp, idx) {
    inp.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
      this.classList.remove('am-code-input--error');
      $('amCodeErr').classList.remove('visible');
      if (this.value && idx < codeInputs.length - 1) codeInputs[idx + 1].focus();
    });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !this.value && idx > 0) codeInputs[idx - 1].focus();
    });
    inp.addEventListener('paste', function (e) {
      e.preventDefault();
      var text = (e.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g, '');
      for (var i = 0; i < codeInputs.length && i < text.length; i++) codeInputs[i].value = text[i];
      codeInputs[Math.min(text.length, codeInputs.length - 1)].focus();
    });
  });

  $('amForgot2Form').addEventListener('submit', function (e) {
    e.preventDefault();
    var code = '';
    codeInputs.forEach(function (c) { code += c.value; });
    if (code.length < 6) {
      codeInputs.forEach(function (c) { if (!c.value) c.classList.add('am-code-input--error'); });
      $('amCodeErr').classList.add('visible');
      return;
    }
    var btn = this.querySelector('.am-submit');
    btn.disabled = true; btn.textContent = 'Verifying...';
    setTimeout(function () {
      btn.disabled = false; btn.textContent = 'Verify Code';
      show('amForgot3');
      $('amNewPw').focus();
    }, 800);
  });

  /* Resend timer */
  var resendInterval;
  function startResend() {
    var sec = 30;
    var area = $('amResendArea');
    var timer = $('amResendTimer');
    clearInterval(resendInterval);
    if (timer) timer.textContent = 'Resend in ' + sec + 's';

    resendInterval = setInterval(function () {
      sec--;
      if (sec <= 0) {
        clearInterval(resendInterval);
        area.innerHTML = 'Didn\'t receive the code? <a id="amResendLink">Resend code</a>';
        $('amResendLink').addEventListener('click', function (e) {
          e.preventDefault();
          area.innerHTML = '<span style="color:#ADB5BD">Code resent!</span>';
          setTimeout(function () {
            area.innerHTML = 'Didn\'t receive the code? <span id="amResendTimer">Resend in 30s</span>';
            startResend();
          }, 2000);
        });
      } else {
        if (timer) timer.textContent = 'Resend in ' + sec + 's';
      }
    }, 1000);
  }

  /* ---- FORGOT STEP 3 (new password) ---- */
  $('amForgot3Form').addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    var pw = $('amNewPw').value;
    var cpw = $('amConfirmPw').value;

    if (!pw || pw.length < 8) { showErr('amNewPw', 'amNewPwErr'); ok = false; }
    if (pw !== cpw) { showErr('amConfirmPw', 'amConfirmPwErr'); ok = false; }
    if (!ok) return;

    var btn = this.querySelector('.am-submit');
    btn.disabled = true; btn.textContent = 'Resetting...';
    setTimeout(function () { show('amForgotOk'); }, 1000);
  });

  /* ============================================================
     6. BIND TRIGGERS (page links / buttons)
     ============================================================ */
  function bindTriggers() {
    // "Become Local" buttons → signup modal
    document.querySelectorAll('a[href="signup.html"], [data-auth="signup"]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); openModal('signup'); });
    });
    // "Sign In" links → signin modal
    document.querySelectorAll('a[href="signin.html"], [data-auth="signin"]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); openModal('signin'); });
    });
    // "Forgot password" page links
    document.querySelectorAll('a[href="forgot-password.html"], [data-auth="forgot"]').forEach(function (el) {
      el.addEventListener('click', function (e) { e.preventDefault(); openModal('forgot'); });
    });
  }

  // Run on load and also expose for SPAs
  bindTriggers();
  window.AuthModal.bindTriggers = bindTriggers;

})();


/* ==================================================================
   BOOKING MODAL SYSTEM
   Handles: Book Now, Room Details, Date Picker, Guest Selector
   ================================================================== */
(function () {
  'use strict';

  /* ---------- CSS ---------- */
  var bCss = document.createElement('style');
  bCss.textContent = [

    /* Shared overlay (reuses same z-index range) */
    '.bm-overlay{position:fixed;inset:0;z-index:10000;background:rgba(33,37,41,.55);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:24px;opacity:0;transition:opacity .3s ease}',
    '.bm-overlay.active{display:flex}',
    '.bm-overlay.visible{opacity:1}',

    /* Container */
    '.bm-container{background:#fff;border-radius:12px;width:100%;max-width:520px;max-height:calc(100vh - 48px);overflow-y:auto;position:relative;transform:translateY(16px) scale(.98);transition:transform .35s cubic-bezier(.25,.46,.45,.94),opacity .3s;opacity:0;scrollbar-width:thin;scrollbar-color:#CED4DA transparent}',
    '.bm-overlay.visible .bm-container{transform:translateY(0) scale(1);opacity:1}',

    /* Close */
    '.bm-close{position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#495057;background:none;border:none;cursor:pointer;transition:all .2s;z-index:2}',
    '.bm-close:hover{background:#F8F9FA;color:#212529}',
    '.bm-close svg{width:18px;height:18px}',

    /* Screens */
    '.bm-screen{display:none;padding:40px}',
    '.bm-screen.active{display:block}',

    /* Booking form */
    '.bm-room-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#ADB5BD;margin-bottom:8px}',
    '.bm-room-title{font-size:22px;font-weight:800;color:#212529;margin-bottom:4px;letter-spacing:-.3px}',
    '.bm-room-price{font-size:14px;color:#677078;margin-bottom:28px}',
    '.bm-room-price strong{font-size:20px;font-weight:800;color:#212529;letter-spacing:-.3px}',
    '.bm-room-price s{color:#ADB5BD;font-size:13px;margin-right:4px}',

    /* Date row */
    '.bm-dates{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px}',
    '.bm-date-field{background:#F8F9FA;border:1.5px solid transparent;border-radius:10px;padding:10px 14px;cursor:pointer;transition:all .25s}',
    '.bm-date-field:focus-within{background:#fff;border-color:#212529;box-shadow:0 0 0 3px rgba(33,37,41,.08)}',
    '.bm-date-label{display:block;font-size:10px;font-weight:600;color:#ADB5BD;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}',
    '.bm-date-input{border:none;background:transparent;font-family:inherit;font-size:14px;font-weight:600;color:#212529;width:100%;outline:none;cursor:pointer}',

    /* Guest selector */
    '.bm-guests{background:#F8F9FA;border:1.5px solid transparent;border-radius:10px;padding:10px 14px;margin-bottom:18px;transition:all .25s}',
    '.bm-guests:focus-within{background:#fff;border-color:#212529;box-shadow:0 0 0 3px rgba(33,37,41,.08)}',
    '.bm-guest-label{display:block;font-size:10px;font-weight:600;color:#ADB5BD;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}',
    '.bm-guest-row{display:flex;align-items:center;justify-content:space-between}',
    '.bm-guest-name{font-size:13px;font-weight:500;color:#212529}',
    '.bm-guest-controls{display:flex;align-items:center;gap:12px}',
    '.bm-guest-btn{width:32px;height:32px;border-radius:50%;border:1.5px solid #CED4DA;background:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:600;color:#212529;cursor:pointer;transition:all .2s}',
    '.bm-guest-btn:hover{background:#F8F9FA;border-color:#ADB5BD}',
    '.bm-guest-btn:disabled{opacity:.3;cursor:not-allowed}',
    '.bm-guest-count{font-size:15px;font-weight:700;color:#212529;min-width:20px;text-align:center}',

    /* Summary */
    '.bm-summary{border-top:1px solid #F8F9FA;padding-top:18px;margin-top:8px;margin-bottom:24px}',
    '.bm-summary-row{display:flex;justify-content:space-between;font-size:13px;color:#677078;margin-bottom:8px}',
    '.bm-summary-row strong{color:#212529}',
    '.bm-summary-total{display:flex;justify-content:space-between;font-size:15px;font-weight:800;color:#212529;padding-top:12px;border-top:1px solid #F8F9FA;margin-top:8px}',

    /* Note */
    '.bm-note{font-size:12px;color:#ADB5BD;text-align:center;margin-top:16px;line-height:1.5}',

    /* Submit (reuse am-submit style) */
    '.bm-submit{width:100%;padding:14px 24px;background:#212529;color:#fff;font-family:inherit;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border:none;border-radius:10px;cursor:pointer;transition:all .25s;position:relative;overflow:hidden}',
    '.bm-submit:hover{background:#000;transform:translateY(-1px);box-shadow:0 6px 20px rgba(0,0,0,.2)}',
    '.bm-submit:active{transform:translateY(0) scale(.98);box-shadow:none}',
    '.bm-submit:disabled{opacity:.5;cursor:not-allowed;transform:none!important;box-shadow:none!important}',
    '.bm-submit--red{background:#A22522}',
    '.bm-submit--red:hover{background:#8b1e1c}',

    /* Success icon */
    '.bm-success{text-align:center;padding:32px 0}',
    '.bm-success-icon{width:64px;height:64px;border-radius:50%;background:#e8f5e9;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;color:#386641}',
    '.bm-success-icon svg{width:28px;height:28px}',
    '.bm-success-title{font-size:22px;font-weight:800;color:#212529;margin-bottom:8px}',
    '.bm-success-text{font-size:14px;color:#677078;line-height:1.6;margin-bottom:6px}',
    '.bm-success-ref{font-size:12px;color:#ADB5BD;margin-bottom:28px}',

    /* Room details modal */
    '.bm-detail-images{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:20px;border-radius:8px;overflow:hidden}',
    '.bm-detail-images img{width:100%;aspect-ratio:4/3;object-fit:cover}',
    '.bm-detail-specs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px}',
    '.bm-detail-spec{font-size:12px;color:#677078;padding:6px 12px;background:#F8F9FA;border-radius:8px}',
    '.bm-detail-section{margin-bottom:20px}',
    '.bm-detail-section h3{font-size:13px;font-weight:700;color:#212529;text-transform:uppercase;letter-spacing:.8px;margin-bottom:12px}',
    '.bm-detail-list{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
    '.bm-detail-item{display:flex;align-items:center;gap:8px;font-size:13px;color:#495057}',
    '.bm-detail-item svg{width:15px;height:15px;color:#ADB5BD;flex-shrink:0}',
    '.bm-detail-desc{font-size:14px;line-height:1.65;color:#677078;margin-bottom:20px}',
    '.bm-detail-footer{display:flex;align-items:center;justify-content:space-between;padding-top:16px;border-top:1px solid #F8F9FA}',
    '.bm-detail-price{font-size:13px;color:#677078}',
    '.bm-detail-price strong{font-size:18px;font-weight:800;color:#212529}',
    '.bm-detail-book{padding:11px 28px;background:#212529;color:#fff;font-family:inherit;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border:none;border-radius:10px;cursor:pointer;transition:all .25s}',
    '.bm-detail-book:hover{background:#000;transform:translateY(-1px);box-shadow:0 4px 14px rgba(0,0,0,.18)}',

    /* Mobile */
    '@media(max-width:768px){',
    '  .bm-container{max-width:100%;border-radius:12px 12px 0 0;max-height:90vh;align-self:flex-end}',
    '  .bm-screen{padding:32px 24px}',
    '  .bm-room-title{font-size:20px}',
    '  .bm-detail-list{grid-template-columns:1fr}',
    '}'

  ].join('\n');
  document.head.appendChild(bCss);

  /* ---------- Icons ---------- */
  var BI = {
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
    tv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>',
    coffee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
    snowflake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/></svg>',
    safe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    bath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"/><path d="M6 12V5a2 2 0 0 1 2-2h1"/></svg>',
    minibar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="4" y1="10" x2="20" y2="10"/><line x1="12" y1="10" x2="12" y2="22"/></svg>'
  };

  /* ---------- Overlay ---------- */
  var bOverlay = document.createElement('div');
  bOverlay.className = 'bm-overlay';
  bOverlay.id = 'bookingModal';

  bOverlay.innerHTML =
    '<div class="bm-container">' +
      '<button class="bm-close" id="bmClose">' + BI.close + '</button>' +

      /* ---- BOOKING FORM ---- */
      '<div class="bm-screen" id="bmBooking">' +
        '<div class="bm-room-badge">Reservation</div>' +
        '<div class="bm-room-title" id="bmRoomTitle"></div>' +
        '<div class="bm-room-price" id="bmRoomPrice"></div>' +

        '<div class="bm-dates">' +
          '<div class="bm-date-field">' +
            '<span class="bm-date-label">Check-in</span>' +
            '<input type="date" class="bm-date-input" id="bmCheckin" value="2026-03-25">' +
          '</div>' +
          '<div class="bm-date-field">' +
            '<span class="bm-date-label">Check-out</span>' +
            '<input type="date" class="bm-date-input" id="bmCheckout" value="2026-03-26">' +
          '</div>' +
        '</div>' +

        '<div class="bm-guests">' +
          '<span class="bm-guest-label">Guests</span>' +
          '<div class="bm-guest-row">' +
            '<span class="bm-guest-name">Adults</span>' +
            '<div class="bm-guest-controls">' +
              '<button class="bm-guest-btn" id="bmAdultMinus" type="button">−</button>' +
              '<span class="bm-guest-count" id="bmAdultCount">2</span>' +
              '<button class="bm-guest-btn" id="bmAdultPlus" type="button">+</button>' +
            '</div>' +
          '</div>' +
          '<div class="bm-guest-row" style="margin-top:10px">' +
            '<span class="bm-guest-name">Children</span>' +
            '<div class="bm-guest-controls">' +
              '<button class="bm-guest-btn" id="bmChildMinus" type="button">−</button>' +
              '<span class="bm-guest-count" id="bmChildCount">0</span>' +
              '<button class="bm-guest-btn" id="bmChildPlus" type="button">+</button>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="bm-summary" id="bmSummary">' +
          '<div class="bm-summary-row"><span id="bmNightsLabel">1 night</span><span id="bmNightsPrice"></span></div>' +
          '<div class="bm-summary-row"><span>Taxes & fees</span><span id="bmTaxes"></span></div>' +
          '<div class="bm-summary-total"><span>Total</span><span id="bmTotal"></span></div>' +
        '</div>' +

        '<button class="bm-submit bm-submit--red" id="bmConfirmBtn">Confirm Reservation</button>' +
        '<div class="bm-note">Free cancellation until 48 hours before check-in. No credit card charged today.</div>' +
      '</div>' +

      /* ---- BOOKING SUCCESS ---- */
      '<div class="bm-screen" id="bmSuccess">' +
        '<div class="bm-success">' +
          '<div class="bm-success-icon">' + BI.check + '</div>' +
          '<div class="bm-success-title">Reservation Confirmed!</div>' +
          '<div class="bm-success-text" id="bmSuccessText"></div>' +
          '<div class="bm-success-ref" id="bmSuccessRef"></div>' +
          '<button class="bm-submit" id="bmSuccessClose">Done</button>' +
        '</div>' +
      '</div>' +

      /* ---- ROOM DETAILS ---- */
      '<div class="bm-screen" id="bmDetails">' +
        '<div class="bm-room-badge" id="bmDetailBadge"></div>' +
        '<div class="bm-room-title" id="bmDetailTitle" style="margin-bottom:16px"></div>' +
        '<div class="bm-detail-images" id="bmDetailImages"></div>' +
        '<div class="bm-detail-specs" id="bmDetailSpecs"></div>' +
        '<p class="bm-detail-desc" id="bmDetailDesc"></p>' +

        '<div class="bm-detail-section">' +
          '<h3>Room Amenities</h3>' +
          '<div class="bm-detail-list">' +
            '<div class="bm-detail-item">' + BI.wifi + ' Free Wi-Fi</div>' +
            '<div class="bm-detail-item">' + BI.tv + ' Flat-Screen TV</div>' +
            '<div class="bm-detail-item">' + BI.coffee + ' Espresso Machine</div>' +
            '<div class="bm-detail-item">' + BI.snowflake + ' Air Conditioning</div>' +
            '<div class="bm-detail-item">' + BI.safe + ' In-Room Safe</div>' +
            '<div class="bm-detail-item">' + BI.bath + ' Rain Shower</div>' +
            '<div class="bm-detail-item">' + BI.minibar + ' Minibar</div>' +
            '<div class="bm-detail-item">' + BI.coffee + ' Complimentary Breakfast</div>' +
          '</div>' +
        '</div>' +

        '<div class="bm-detail-section">' +
          '<h3>Policies</h3>' +
          '<div class="bm-detail-list">' +
            '<div class="bm-detail-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Check-in: 14:00</div>' +
            '<div class="bm-detail-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 8 14"/></svg> Check-out: 12:00</div>' +
            '<div class="bm-detail-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 6 6 18M6 6l12 12"/></svg> No smoking</div>' +
            '<div class="bm-detail-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> Pets allowed</div>' +
          '</div>' +
        '</div>' +

        '<div class="bm-detail-footer">' +
          '<div class="bm-detail-price" id="bmDetailPrice"></div>' +
          '<button class="bm-detail-book" id="bmDetailBook">Book This Room</button>' +
        '</div>' +
      '</div>' +

    '</div>';

  document.body.appendChild(bOverlay);

  /* ---------- Helpers ---------- */
  var B = function (id) { return document.getElementById(id); };
  var bScreens = bOverlay.querySelectorAll('.bm-screen');
  var currentRoom = {};

  function bShow(id) {
    bScreens.forEach(function (s) { s.classList.remove('active'); });
    var el = B(id);
    if (el) { el.classList.add('active'); el.closest('.bm-container').scrollTop = 0; }
  }

  function bOpen(screenId) {
    bShow(screenId);
    bOverlay.classList.add('active');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { bOverlay.classList.add('visible'); });
    });
    document.body.style.overflow = 'hidden';
  }

  function bClose() {
    bOverlay.classList.remove('visible');
    setTimeout(function () {
      bOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }, 300);
  }

  /* Close handlers */
  B('bmClose').addEventListener('click', bClose);
  bOverlay.addEventListener('click', function (e) { if (e.target === bOverlay) bClose(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && bOverlay.classList.contains('active')) bClose();
  });
  B('bmSuccessClose').addEventListener('click', bClose);

  /* ---------- Extract room data from a .booking-widget__room element ---------- */
  function extractRoom(roomEl) {
    var name = roomEl.querySelector('.booking-widget__room-name');
    var priceEl = roomEl.querySelector('.price-current');
    var origEl = roomEl.querySelector('.price-original');
    var specs = roomEl.querySelectorAll('.booking-widget__room-specs span');
    var imgs = roomEl.querySelectorAll('.booking-widget__room-images img');
    var view = roomEl.querySelector('.booking-widget__room-view');

    var price = priceEl ? parseInt(priceEl.textContent.replace(/[^0-9]/g, ''), 10) : 0;
    var orig = origEl ? parseInt(origEl.textContent.replace(/[^0-9]/g, ''), 10) : 0;

    return {
      name: name ? name.textContent : '',
      price: price,
      original: orig,
      specs: Array.prototype.map.call(specs, function (s) { return s.textContent; }),
      images: Array.prototype.map.call(imgs, function (i) { return { src: i.src, alt: i.alt }; }),
      view: view ? view.textContent : ''
    };
  }

  /* ---------- Booking form logic ---------- */
  var adults = 2, children = 0;

  function updateGuestUI() {
    B('bmAdultCount').textContent = adults;
    B('bmChildCount').textContent = children;
    B('bmAdultMinus').disabled = adults <= 1;
    B('bmChildMinus').disabled = children <= 0;
    B('bmAdultPlus').disabled = adults >= 6;
    B('bmChildPlus').disabled = children >= 4;
    updateSummary();
  }

  B('bmAdultMinus').addEventListener('click', function () { if (adults > 1) { adults--; updateGuestUI(); } });
  B('bmAdultPlus').addEventListener('click', function () { if (adults < 6) { adults++; updateGuestUI(); } });
  B('bmChildMinus').addEventListener('click', function () { if (children > 0) { children--; updateGuestUI(); } });
  B('bmChildPlus').addEventListener('click', function () { if (children < 4) { children++; updateGuestUI(); } });

  function getNights() {
    var ci = new Date(B('bmCheckin').value);
    var co = new Date(B('bmCheckout').value);
    var diff = Math.round((co - ci) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }

  function updateSummary() {
    var nights = getNights();
    var subtotal = currentRoom.price * nights;
    var tax = Math.round(subtotal * 0.12);
    var total = subtotal + tax;

    B('bmNightsLabel').textContent = nights + ' night' + (nights > 1 ? 's' : '') + ' × $' + currentRoom.price;
    B('bmNightsPrice').textContent = '$' + subtotal;
    B('bmTaxes').textContent = '$' + tax;
    B('bmTotal').innerHTML = '<strong>$' + total + '</strong>';
  }

  B('bmCheckin').addEventListener('change', function () {
    var ci = new Date(this.value);
    var co = new Date(B('bmCheckout').value);
    if (co <= ci) {
      var next = new Date(ci);
      next.setDate(next.getDate() + 1);
      B('bmCheckout').value = next.toISOString().split('T')[0];
    }
    updateSummary();
  });
  B('bmCheckout').addEventListener('change', updateSummary);

  function openBooking(room) {
    currentRoom = room;
    B('bmRoomTitle').textContent = room.name;

    var priceHtml = '';
    if (room.original) priceHtml += '<s>$' + room.original + '</s> ';
    priceHtml += 'From <strong>$' + room.price + '</strong> / night';
    B('bmRoomPrice').innerHTML = priceHtml;

    // Sync dates from sidebar if available
    var sidebarCI = document.querySelector('.booking-widget__date-value');
    if (sidebarCI) {
      var dates = document.querySelectorAll('.booking-widget__date-value');
      if (dates[0]) B('bmCheckin').value = dates[0].textContent;
      if (dates[1]) B('bmCheckout').value = dates[1].textContent;
    }

    adults = 2; children = 0;
    updateGuestUI();
    B('bmConfirmBtn').disabled = false;
    B('bmConfirmBtn').textContent = 'Confirm Reservation';
    bOpen('bmBooking');
  }

  /* Confirm reservation */
  B('bmConfirmBtn').addEventListener('click', function () {
    var btn = this;
    btn.disabled = true;
    btn.textContent = 'Processing...';

    setTimeout(function () {
      var nights = getNights();
      var total = currentRoom.price * nights + Math.round(currentRoom.price * nights * 0.12);
      var ref = 'LH-' + Math.random().toString(36).substr(2, 8).toUpperCase();

      B('bmSuccessText').innerHTML = '<strong>' + currentRoom.name + '</strong><br>' +
        B('bmCheckin').value + ' → ' + B('bmCheckout').value + ' · ' +
        adults + ' adult' + (adults > 1 ? 's' : '') +
        (children > 0 ? ', ' + children + ' child' + (children > 1 ? 'ren' : '') : '') +
        '<br>Total: <strong>$' + total + '</strong>';
      B('bmSuccessRef').textContent = 'Confirmation #' + ref;

      bShow('bmSuccess');
    }, 1500);
  });

  /* ---------- Room details logic ---------- */
  var roomDescriptions = {
    'Economy Single Room': 'A cozy and efficient room designed for solo travelers. Features a comfortable single bed, workspace, and all essentials for a pleasant stay in the heart of Tbilisi.',
    'Queen Room with Balcony': 'A bright and airy room featuring a private balcony overlooking the neighborhood. The queen bed and natural light make this a popular choice for couples.',
    'Standard King Room': 'Spacious and refined, the Standard King offers generous floor space with a king-size bed, sitting area, and carefully curated art from local Georgian artists.',
    'Deluxe Double Room': 'Flexible bedding options make this room ideal for friends or small families. The Deluxe Double combines extra space with thoughtful design details throughout.',
    'Family Room': 'Our largest standard room, designed for families. Features a king bed plus additional sleeping arrangements, with ample space for luggage and relaxation.',
    'Artizan Suite': 'The signature suite of the hotel. A separately partitioned living area, premium furnishings, curated artwork, and exclusive amenities create an unforgettable stay.'
  };

  function openDetails(room) {
    currentRoom = room;
    B('bmDetailBadge').textContent = room.view || 'Room';
    B('bmDetailTitle').textContent = room.name;

    var imgHtml = '';
    room.images.forEach(function (img) {
      imgHtml += '<img src="' + img.src + '" alt="' + img.alt + '">';
    });
    B('bmDetailImages').innerHTML = imgHtml;

    var specHtml = '';
    room.specs.forEach(function (s) {
      specHtml += '<span class="bm-detail-spec">' + s + '</span>';
    });
    if (room.view) specHtml += '<span class="bm-detail-spec">' + room.view + '</span>';
    B('bmDetailSpecs').innerHTML = specHtml;

    B('bmDetailDesc').textContent = roomDescriptions[room.name] || 'A beautifully appointed room combining Georgian heritage with modern comfort. Every detail has been carefully considered for your stay.';

    var priceHtml = '';
    if (room.original) priceHtml += '<s>$' + room.original + '</s> ';
    priceHtml += 'From <strong>$' + room.price + '</strong> / night';
    B('bmDetailPrice').innerHTML = priceHtml;

    bOpen('bmDetails');
  }

  /* Book from details screen */
  B('bmDetailBook').addEventListener('click', function () {
    bShow('bmBooking');
    B('bmRoomTitle').textContent = currentRoom.name;
    var priceHtml = '';
    if (currentRoom.original) priceHtml += '<s>$' + currentRoom.original + '</s> ';
    priceHtml += 'From <strong>$' + currentRoom.price + '</strong> / night';
    B('bmRoomPrice').innerHTML = priceHtml;
    adults = 2; children = 0;
    updateGuestUI();
    B('bmConfirmBtn').disabled = false;
    B('bmConfirmBtn').textContent = 'Confirm Reservation';
  });

  /* ---------- Bind to page elements ---------- */
  function bindBookingTriggers() {
    // "Book Now" buttons
    document.querySelectorAll('.booking-widget__room-reserve').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var roomEl = btn.closest('.booking-widget__room');
        if (roomEl) openBooking(extractRoom(roomEl));
      });
    });

    // "Amenities & Details" links
    document.querySelectorAll('.booking-widget__room-details').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var roomEl = link.closest('.booking-widget__room');
        if (roomEl) openDetails(extractRoom(roomEl));
      });
    });

    // Sidebar date fields — make them interactive
    document.querySelectorAll('.booking-widget__date-col').forEach(function (col) {
      col.style.cursor = 'pointer';
      col.addEventListener('click', function () {
        var label = col.querySelector('.booking-widget__date-label');
        var value = col.querySelector('.booking-widget__date-value');
        if (!label || !value) return;
        var isCheckin = /check.?in/i.test(label.textContent);
        var input = document.createElement('input');
        input.type = 'date';
        input.value = value.textContent;
        input.style.cssText = 'position:absolute;opacity:0;width:0;height:0;';
        col.appendChild(input);
        input.showPicker ? input.showPicker() : input.click();
        input.addEventListener('change', function () {
          value.textContent = input.value;
          input.remove();
          // Sync the other date if needed
          var allCols = document.querySelectorAll('.booking-widget__date-col');
          if (isCheckin && allCols[1]) {
            var ciDate = new Date(input.value);
            var coVal = allCols[1].querySelector('.booking-widget__date-value');
            if (coVal && new Date(coVal.textContent) <= ciDate) {
              ciDate.setDate(ciDate.getDate() + 1);
              coVal.textContent = ciDate.toISOString().split('T')[0];
            }
          }
        });
        input.addEventListener('blur', function () { input.remove(); });
      });
    });
  }

  bindBookingTriggers();

  /* Expose */
  window.BookingModal = { open: openBooking, openDetails: openDetails, close: bClose, bindTriggers: bindBookingTriggers };

})();
