// Genii Books Mock Data
// Educational content for 10th, 11th, 12th, and NEET students

// Board types for filter
export const boardTypes = [
    { id: 'all', label: 'All Boards' },
    { id: 'state', label: 'State Board' },
    { id: 'cbse', label: 'CBSE' },
];

// Content types for filter
export const contentTypes = [
    { id: 'all', label: 'All Content' },
    { id: 'pdf', label: 'PDFs Only' },
    { id: 'video', label: 'Videos Only' },
];

// Subject types for filter
export const subjectFilters = [
    { id: 'all', label: 'All Subjects' },
    { id: 'physics', label: 'Physics' },
    { id: 'chemistry', label: 'Chemistry' },
    { id: 'mathematics', label: 'Mathematics' },
    { id: 'biology', label: 'Biology' },
    { id: 'english', label: 'English' },
    { id: 'science', label: 'Science' },
];

// Mock user data
export const mockUser = {
    id: 'user_001',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    whatsapp: '+91 9876543210',
    class: '12',
    school: 'Delhi Public School',
    pincode: '110001',
    subscription: {
        allPdfs: false,      // Has access to all PDFs
        allVideos: false,    // Has access to all Videos
        purchasedItems: [],  // Array of individually purchased content IDs
        // Example: [1, 3, 5] means user purchased content with IDs 1, 3, 5
    },
    createdAt: '2026-01-01',
};

// Pricing Configuration
export const pricing = {
    // Subscription prices (for all content)
    allPdfs: 999,       // Access to ALL PDFs
    allVideos: 1499,    // Access to ALL Videos
    allContent: 1999,   // Access to BOTH PDFs and Videos (combo)

    // Individual purchase prices (per item)
    singlePdf: 49,      // Price per PDF
    singleVideo: 99,    // Price per Video
};

// Mock content (PDFs and Videos)
export const mockContent = [
    // State Board PDFs
    { id: 1, title: 'Physics - Laws of Motion Notes', type: 'pdf', board: 'state', targetClass: ['11', '12'], subject: 'physics', thumbnail: 'https://picsum.photos/200/120?random=1', rating: 4.8, pages: 25, isFree: false },
    { id: 2, title: 'Chemistry - Periodic Table Guide', type: 'pdf', board: 'state', targetClass: ['11', '12', 'neet'], subject: 'chemistry', thumbnail: 'https://picsum.photos/200/120?random=2', rating: 4.6, pages: 18, isFree: true },
    { id: 3, title: 'Mathematics - Trigonometry Formulas', type: 'pdf', board: 'state', targetClass: ['10', '11', '12'], subject: 'mathematics', thumbnail: 'https://picsum.photos/200/120?random=3', rating: 4.9, pages: 12, isFree: false },
    { id: 4, title: 'Biology - Cell Structure Notes', type: 'pdf', board: 'state', targetClass: ['11', '12', 'neet'], subject: 'biology', thumbnail: 'https://picsum.photos/200/120?random=4', rating: 4.7, pages: 20, isFree: false },

    // State Board Videos
    { id: 5, title: 'Physics - Mechanics Complete Lecture', type: 'video', board: 'state', targetClass: ['11', '12'], subject: 'physics', thumbnail: 'https://picsum.photos/200/120?random=5', rating: 4.7, duration: '45 min', isFree: false },
    { id: 6, title: 'Chemistry - Organic Reactions', type: 'video', board: 'state', targetClass: ['12', 'neet'], subject: 'chemistry', thumbnail: 'https://picsum.photos/200/120?random=6', rating: 4.8, duration: '38 min', isFree: true },
    { id: 7, title: 'Mathematics - Calculus Basics', type: 'video', board: 'state', targetClass: ['11', '12'], subject: 'mathematics', thumbnail: 'https://picsum.photos/200/120?random=7', rating: 4.6, duration: '52 min', isFree: false },

    // CBSE PDFs
    { id: 8, title: 'CBSE Physics - Modern Physics Notes', type: 'pdf', board: 'cbse', targetClass: ['12'], subject: 'physics', thumbnail: 'https://picsum.photos/200/120?random=8', rating: 4.9, pages: 30, isFree: false },
    { id: 9, title: 'CBSE Chemistry - Chemical Bonding', type: 'pdf', board: 'cbse', targetClass: ['11', '12'], subject: 'chemistry', thumbnail: 'https://picsum.photos/200/120?random=9', rating: 4.7, pages: 22, isFree: false },
    { id: 10, title: 'CBSE Biology - Human Physiology', type: 'pdf', board: 'cbse', targetClass: ['11', '12', 'neet'], subject: 'biology', thumbnail: 'https://picsum.photos/200/120?random=10', rating: 4.8, pages: 35, isFree: true },

    // CBSE Videos
    { id: 11, title: 'CBSE Physics - Electromagnetism Lecture', type: 'video', board: 'cbse', targetClass: ['12'], subject: 'physics', thumbnail: 'https://picsum.photos/200/120?random=11', rating: 4.9, duration: '52 min', isFree: false },
    { id: 12, title: 'CBSE Mathematics - Calculus Full Course', type: 'video', board: 'cbse', targetClass: ['11', '12'], subject: 'mathematics', thumbnail: 'https://picsum.photos/200/120?random=12', rating: 4.6, duration: '1 hr 20 min', isFree: false },

    // Class 10 Content
    { id: 13, title: 'Class 10 Science - Complete Notes', type: 'pdf', board: 'state', targetClass: ['10'], subject: 'science', thumbnail: 'https://picsum.photos/200/120?random=13', rating: 4.8, pages: 45, isFree: false },
    { id: 14, title: 'CBSE Class 10 - Math Video Lecture', type: 'video', board: 'cbse', targetClass: ['10'], subject: 'mathematics', thumbnail: 'https://picsum.photos/200/120?random=14', rating: 4.9, duration: '2 hrs', isFree: false },
    { id: 15, title: 'English Grammar - Tenses Notes', type: 'pdf', board: 'state', targetClass: ['10', '11'], subject: 'english', thumbnail: 'https://picsum.photos/200/120?random=15', rating: 4.5, pages: 15, isFree: true },
];

// Subscription Plans
export const subscriptionPlans = [
    {
        id: 'all_pdfs',
        name: 'All PDFs Access',
        price: pricing.allPdfs,
        duration: '1 Year',
        icon: 'file-document-multiple',
        color: '#E74C3C',
        features: [
            'Access to ALL PDF materials',
            'State Board + CBSE PDFs',
            'Offline download enabled',
            'All classes content',
        ],
    },
    {
        id: 'all_videos',
        name: 'All Videos Access',
        price: pricing.allVideos,
        duration: '1 Year',
        icon: 'video-box',
        color: '#3498DB',
        features: [
            'Access to ALL Video lectures',
            'State Board + CBSE Videos',
            'HD quality streaming',
            'All classes content',
        ],
    },
    {
        id: 'all_content',
        name: 'Complete Access',
        price: pricing.allContent,
        duration: '1 Year',
        icon: 'crown',
        color: '#F39C12',
        popular: true,
        features: [
            'Access to ALL PDFs + Videos',
            'State Board + CBSE content',
            'Offline download enabled',
            'HD quality streaming',
            'Priority support',
        ],
    },
];

// Function to check if user has access to specific content
export const hasAccess = (user, content) => {
    // Free content is always accessible
    if (content.isFree) return true;

    // Check if user has subscription for this content type
    if (content.type === 'pdf' && user.subscription.allPdfs) return true;
    if (content.type === 'video' && user.subscription.allVideos) return true;

    // Check if user purchased this specific item
    if (user.subscription.purchasedItems.includes(content.id)) return true;

    return false;
};

// Function to get price for individual content
export const getContentPrice = (contentType) => {
    return contentType === 'pdf' ? pricing.singlePdf : pricing.singleVideo;
};

// Mock notifications
export const mockNotifications = [
    { id: 1, title: 'New Physics Notes Available', message: 'Check out the latest State Board physics notes!', targetClass: ['11', '12'], createdAt: '2026-01-05', read: false },
    { id: 2, title: 'Video Series Update', message: 'New chemistry video lectures are now live!', targetClass: ['12', 'neet'], createdAt: '2026-01-04', read: true },
    { id: 3, title: 'Special Offer', message: 'Get 20% off on Complete Access plan this week!', targetClass: ['all'], createdAt: '2026-01-03', read: false },
];

export default {
    mockUser,
    mockContent,
    subscriptionPlans,
    pricing,
    boardTypes,
    contentTypes,
    subjectFilters,
    hasAccess,
    getContentPrice,
    mockNotifications,
};
