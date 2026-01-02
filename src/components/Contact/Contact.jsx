import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiSend, FiUser, FiMail, FiMessageSquare, FiCheck, FiAlertCircle, FiPhone, FiX, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import confetti from 'canvas-confetti';
import './Contact.css';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errors, setErrors] = useState({});
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneRequestForm, setPhoneRequestForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [phoneRequestStatus, setPhoneRequestStatus] = useState('idle');
  const [phoneRequestErrors, setPhoneRequestErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // ESC key to close overlay
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showPhoneModal) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showPhoneModal]);

  const validateForm = () => {
    const newErrors = {};

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/mwpqnbbe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
        setErrors({});

        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Phone Request Handlers
  const handleCloseModal = () => {
    setShowPhoneModal(false);
    setTimeout(() => {
      setPhoneRequestForm({ name: '', email: '', phone: '', message: '' });
      setPhoneRequestStatus('idle');
      setPhoneRequestErrors({});
      setFocusedField(null);
    }, 300);
  };

  const validatePhoneRequest = () => {
    const newErrors = {};

    if (!phoneRequestForm.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!phoneRequestForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phoneRequestForm.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!phoneRequestForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setPhoneRequestErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneRequestSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhoneRequest()) {
      return;
    }

    setPhoneRequestStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/mwpqnbbe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject: 'Phone Number Request',
          ...phoneRequestForm,
          message: `Phone Number Request:\n\nName: ${phoneRequestForm.name}\nEmail: ${phoneRequestForm.email}\nPhone: ${phoneRequestForm.phone}\nMessage: ${phoneRequestForm.message || 'No additional message'}`
        })
      });

      if (response.ok) {
        setPhoneRequestStatus('success');
        setPhoneRequestForm({ name: '', email: '', phone: '', message: '' });
        setPhoneRequestErrors({});

        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Close modal after 2 seconds
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      } else {
        throw new Error('Failed to send request');
      }
    } catch (error) {
      setPhoneRequestStatus('error');
      setTimeout(() => setPhoneRequestStatus('idle'), 5000);
    }
  };

  const handlePhoneRequestChange = (e) => {
    const { name, value } = e.target;
    setPhoneRequestForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (phoneRequestErrors[name]) {
      setPhoneRequestErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCopyEmail = async () => {
    const email = 'roulommprakash5@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      label: 'Email',
      hasCopyButton: true
    },
    {
      icon: <FiPhone />,
      label: 'Phone',
      value: 'Available on request',
      hasButton: true,
      buttonText: 'Request Number',
      onClick: () => setShowPhoneModal(true)
    }
  ];

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-container">
        {/* Section Header */}
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-description">
            Have a project in mind? Let's create something amazing together
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="info-title">Let's Talk</h3>
            <p className="info-description">
              Whether you have a question, want to start a project, or just want to connect,
              feel free to drop me a message. I'm always excited to collaborate on new ideas!
            </p>

            <div className="contact-info-list">
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-info-item">
                  <div className="info-icon">{item.icon}</div>
                  <div className="info-content">
                    <span className="info-label">{item.label}</span>
                    {item.link ? (
                      <a href={item.link} className="info-value-link">{item.value}</a>
                    ) : item.value ? (
                      <span className="info-value">{item.value}</span>
                    ) : null}
                    {item.hasCopyButton && (
                      <motion.button
                        onClick={handleCopyEmail}
                        className="copy-email-button"
                        initial={{ scale: 1 }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: '0 8px 30px rgba(88, 166, 255, 0.5)'
                        }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                          background: emailCopied 
                            ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2))'
                            : 'linear-gradient(135deg, rgba(88, 166, 255, 0.15), rgba(147, 51, 234, 0.15))'
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="button-glow"
                          animate={{
                            opacity: emailCopied ? [0.3, 0.6, 0.3] : 0.3,
                            scale: emailCopied ? [1, 1.2, 1] : 1
                          }}
                          transition={{ duration: 0.6 }}
                        />
                        <AnimatePresence mode="wait">
                          {emailCopied ? (
                            <motion.div
                              key="copied"
                              className="button-content"
                              initial={{ opacity: 0, y: 10, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.8 }}
                              transition={{ duration: 0.25, ease: 'easeOut' }}
                            >
                              <motion.div
                                initial={{ rotate: -180, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                              >
                                <FiCheck className="button-icon success-icon" />
                              </motion.div>
                              <span className="button-text success-text">Email Copied!</span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copy"
                              className="button-content"
                              initial={{ opacity: 0, y: 10, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.8 }}
                              transition={{ duration: 0.25, ease: 'easeOut' }}
                            >
                              <FiMail className="button-icon" />
                              <span className="button-text">Copy Email</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    )}
                    {item.hasButton && (
                      <motion.button 
                        onClick={item.onClick}
                        className="info-request-button"
                        initial={{ scale: 1 }}
                        whileHover={{ 
                          scale: 1.05,
                          y: -3,
                          boxShadow: '0 8px 30px rgba(var(--accent-rgb), 0.6)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiPhone className="btn-icon" />
                        {item.buttonText}
                      </motion.button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-cta">
              <p style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--color-textSecondary)' }}>Prefer social media?</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href="https://github.com/Omm7" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    background: 'var(--color-bgSecondary)',
                    border: '2px solid var(--color-border)',
                    borderRadius: '50px',
                    color: 'var(--color-text)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{ fontSize: '22px', lineHeight: '1' }}>🔗</span>
                  <span>GitHub</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/omm-prakash-roul" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    background: 'var(--color-bgSecondary)',
                    border: '2px solid var(--color-border)',
                    borderRadius: '50px',
                    color: 'var(--color-text)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{ fontSize: '22px', lineHeight: '1' }}>💼</span>
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://lnkd.in/gYePAYaQ" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    background: 'var(--color-bgSecondary)',
                    border: '2px solid var(--color-border)',
                    borderRadius: '50px',
                    color: 'var(--color-text)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <span style={{ fontSize: '22px', lineHeight: '1' }}>🐦</span>
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '0.5rem' }}>
                    <FiUser style={{ width: '16px', height: '16px' }} />
                  </span>
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Your name"
                  disabled={status === 'loading'}
                />
                {errors.name && (
                  <span className="error-message">
                    <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '0.25rem' }}>
                      <FiAlertCircle style={{ width: '14px', height: '14px' }} />
                    </span>
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '0.5rem' }}>
                    <FiMail style={{ width: '16px', height: '16px' }} />
                  </span>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="your.email@example.com"
                  disabled={status === 'loading'}
                />
                {errors.email && (
                  <span className="error-message">
                    <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '0.25rem' }}>
                      <FiAlertCircle style={{ width: '14px', height: '14px' }} />
                    </span>
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Subject Field */}
              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  Subject (Optional)
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="What's this about?"
                  disabled={status === 'loading'}
                />
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '0.5rem' }}>
                    <FiMessageSquare style={{ width: '16px', height: '16px' }} />
                  </span>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  placeholder="Tell me about your project..."
                  rows="6"
                  disabled={status === 'loading'}
                />
                {errors.message && (
                  <span className="error-message">
                    <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '0.25rem' }}>
                      <FiAlertCircle style={{ width: '14px', height: '14px' }} />
                    </span>
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`submit-btn ${status}`}
                disabled={status === 'loading' || status === 'success'}
              >
                {status === 'idle' && (
                  <>
                    <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '0.5rem' }}>
                      <FiSend style={{ width: '18px', height: '18px' }} />
                    </span>
                    Send Message
                  </>
                )}
                {status === 'loading' && (
                  <>
                    <div className="spinner"></div> Sending...
                  </>
                )}
                {status === 'success' && (
                  <>
                    <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '0.5rem' }}>
                      <FiCheck style={{ width: '18px', height: '18px' }} />
                    </span>
                    Message Sent!
                  </>
                )}
                {status === 'error' && (
                  <>
                    <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '0.5rem' }}>
                      <FiAlertCircle style={{ width: '18px', height: '18px' }} />
                    </span>
                    Try Again
                  </>
                )}
              </button>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  className="status-message success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '0.5rem' }}>
                    <FiCheck style={{ width: '20px', height: '20px' }} />
                  </span>
                  Thanks for reaching out! I'll get back to you soon.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  className="status-message error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '0.5rem' }}>
                    <FiAlertCircle style={{ width: '20px', height: '20px' }} />
                  </span>
                  Oops! Something went wrong. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Full-Screen Request Overlay */}
      <AnimatePresence>
        {showPhoneModal && (
          <motion.div
            className="request-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="request-backdrop"
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(20px)' }}
              exit={{ backdropFilter: 'blur(0px)' }}
              onClick={handleCloseModal}
            />

            {/* Close Button */}
            <motion.button
              className="request-close"
              onClick={handleCloseModal}
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.2 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close request form"
            >
              <FiX />
            </motion.button>

            {/* Form Container */}
            <motion.div
              className="request-container"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <motion.div
                className="request-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.div
                  className="request-icon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.4 }}
                >
                  <FiPhone />
                </motion.div>
                <h2 className="request-title">Request a Call</h2>
                <p className="request-subtitle">
                  Share your details and I'll reach out to you personally
                </p>
              </motion.div>

              {/* Form */}
              <motion.form
                className="request-form"
                onSubmit={handlePhoneRequestSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {/* Full Name Field */}
                <motion.div
                  className="floating-field"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, type: 'spring', damping: 20 }}
                >
                  <input
                    type="text"
                    id="req-name"
                    name="name"
                    value={phoneRequestForm.name}
                    onChange={handlePhoneRequestChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`floating-input ${phoneRequestErrors.name ? 'error' : ''} ${phoneRequestForm.name || focusedField === 'name' ? 'filled' : ''}`}
                    disabled={phoneRequestStatus === 'loading'}
                    required
                  />
                  <label htmlFor="req-name" className="floating-label">
                    <FiUser /> Full Name
                  </label>
                  {phoneRequestErrors.name && (
                    <motion.span
                      className="field-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <FiAlertCircle /> {phoneRequestErrors.name}
                    </motion.span>
                  )}
                </motion.div>

                {/* Phone Number Field */}
                <motion.div
                  className="floating-field"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7, type: 'spring', damping: 20 }}
                >
                  <input
                    type="tel"
                    id="req-phone"
                    name="phone"
                    value={phoneRequestForm.phone}
                    onChange={handlePhoneRequestChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className={`floating-input ${phoneRequestErrors.phone ? 'error' : ''} ${phoneRequestForm.phone || focusedField === 'phone' ? 'filled' : ''}`}
                    disabled={phoneRequestStatus === 'loading'}
                    required
                  />
                  <label htmlFor="req-phone" className="floating-label">
                    <FiPhone /> Phone Number
                  </label>
                  {phoneRequestErrors.phone && (
                    <motion.span
                      className="field-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <FiAlertCircle /> {phoneRequestErrors.phone}
                    </motion.span>
                  )}
                </motion.div>

                {/* Email Address Field */}
                <motion.div
                  className="floating-field"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8, type: 'spring', damping: 20 }}
                >
                  <input
                    type="email"
                    id="req-email"
                    name="email"
                    value={phoneRequestForm.email}
                    onChange={handlePhoneRequestChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`floating-input ${phoneRequestErrors.email ? 'error' : ''} ${phoneRequestForm.email || focusedField === 'email' ? 'filled' : ''}`}
                    disabled={phoneRequestStatus === 'loading'}
                    required
                  />
                  <label htmlFor="req-email" className="floating-label">
                    <FiMail /> Email Address
                  </label>
                  {phoneRequestErrors.email && (
                    <motion.span
                      className="field-error"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <FiAlertCircle /> {phoneRequestErrors.email}
                    </motion.span>
                  )}
                </motion.div>

                {/* Message Field (Optional) */}
                <motion.div
                  className="floating-field"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9, type: 'spring', damping: 20 }}
                >
                  <textarea
                    id="req-message"
                    name="message"
                    value={phoneRequestForm.message}
                    onChange={handlePhoneRequestChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={`floating-input floating-textarea ${phoneRequestForm.message || focusedField === 'message' ? 'filled' : ''}`}
                    disabled={phoneRequestStatus === 'loading'}
                    rows="4"
                  />
                  <label htmlFor="req-message" className="floating-label">
                    <FiMessageSquare /> Message (Optional)
                  </label>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="request-submit"
                  disabled={phoneRequestStatus === 'loading' || phoneRequestStatus === 'success'}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, type: 'spring', damping: 20 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {phoneRequestStatus === 'loading' ? (
                    <>
                      <motion.span
                        className="btn-spinner"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending Request...
                    </>
                  ) : phoneRequestStatus === 'success' ? (
                    <>
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 15 }}
                      >
                        <FiCheck />
                      </motion.span>
                      Request Sent Successfully!
                    </>
                  ) : (
                    <>
                      <FiSend /> Send Request
                    </>
                  )}
                </motion.button>

                {/* Error Message */}
                {phoneRequestStatus === 'error' && (
                  <motion.div
                    className="request-error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                  >
                    <FiAlertCircle />
                    <span>Failed to send request. Please try again.</span>
                  </motion.div>
                )}
              </motion.form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
