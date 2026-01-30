// ==========================================
// PRICING CONFIGURATION - EDIT THIS FILE TO UPDATE PRICING
// ==========================================
// Just change the text below and save - the website will update automatically!

export const pricingConfig = {
  // Page Header
  pageTitle: "Simple",
  pageTitleHighlight: "pricing",
  pageSubtitle: "No hidden fees. No surprises. Just clear pricing for video that converts.",

  // Pricing Plans
  plans: [
    {
      name: "Starter",
      price: "$1,499",
      description: "Perfect for homepage clarity.",
      features: [
        "60-90s explainer video",
        "Script & storyboard",
        "Motion design",
        "Sound design",
        "2 revisions"
      ],
      deliveryTime: "7-10 days",
      buttonText: "Get Started",
      featured: false
    },
    {
      name: "Growth",
      price: "$2,999",
      description: "Full video system.",
      features: [
        "1 flagship video",
        "8-12 short clips",
        "Multi-platform exports",
        "Caption templates",
        "Script included",
        "2 revisions"
      ],
      deliveryTime: "10-14 days",
      buttonText: "Get Started",
      featured: true,
      featuredLabel: "Most Popular"
    },
    {
      name: "Agency",
      price: "Custom",
      description: "Ongoing partnership.",
      features: [
        "Monthly planning",
        "2-4 core videos",
        "20-40 clips",
        "Priority support",
        "Dedicated system",
        "Slack access"
      ],
      deliveryTime: "Ongoing",
      buttonText: "Contact Us",
      featured: false
    }
  ],

  // What's Included Section
  includedTitle: "Everything you",
  includedTitleHighlight: "need",
  includedFeatures: [
    "Strategy & scripting",
    "Motion design",
    "Voiceover (AI/human)",
    "Sound design",
    "Multi-platform exports",
    "Revision rounds"
  ],

  // FAQ Section
  faqTitle: "Common",
  faqTitleHighlight: "questions",
  faqs: [
    {
      question: "What does your process look like?",
      answer: "Discovery → Strategy → Production → Launch. 4 steps, 7 days. Everything async to respect your time."
    },
    {
      question: "How involved do we need to be?",
      answer: "One 30-min kickoff call and one review. Everything else is async via Loom."
    },
    {
      question: "Do you guarantee results?",
      answer: "We guarantee clarity and quality. If you're not happy, we revise until you are."
    },
    {
      question: "What about revisions?",
      answer: "All packages include 2 rounds. Additional revisions at $150/hour."
    },
    {
      question: "Can you match our brand?",
      answer: "Absolutely. We work within your guidelines or help create a video-specific system."
    }
  ],

  // Bottom CTA
  bottomCtaText: "Not sure which package?",
  bottomCtaButton: "Book a Free Call"
};
