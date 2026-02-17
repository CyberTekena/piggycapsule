export const CURRENT_USER = {
  id: 'u1',
  name: 'Tajuz',
  avatar: 'https://i.pravatar.cc/150?u=u1',
  totalSaved: 12500,
  currency: '$',
};

export const CAPSULES = [
  {
    id: 'c1',
    title: 'Family Holiday',
    goalAmount: 5000,
    currentAmount: 3750, // 75%
    deadline: '2024-12-25',
    status: 'active', // active, locked, unlocked
    color: ['#FF2E63', '#FF6B6B'], // Pink gradient
    contributors: [
      { id: 'u1', avatar: 'https://i.pravatar.cc/150?u=u1' },
      { id: 'u2', avatar: 'https://i.pravatar.cc/150?u=u2' },
      { id: 'u3', avatar: 'https://i.pravatar.cc/150?u=u3' },
    ],
    nextContribution: '2024-03-01',
  },
  {
    id: 'c2',
    title: 'New Car Fund',
    goalAmount: 12000,
    currentAmount: 3600, // 30%
    deadline: '2026-06-20',
    status: 'active',
    color: ['#08D9D6', '#00ADB5'], // Cyan gradient
    contributors: [
      { id: 'u1', avatar: 'https://i.pravatar.cc/150?u=u1' },
    ],
    nextContribution: '2024-03-15',
  },
  {
    id: 'c3',
    title: 'Emergency Stash',
    goalAmount: 10000,
    currentAmount: 8200, // 82%
    deadline: '2025-01-01',
    status: 'locked',
    color: ['#FAE100', '#FDCB00'], // Yellow gradient (Gold)
    contributors: [
      { id: 'u1', avatar: 'https://i.pravatar.cc/150?u=u1' },
      { id: 'u4', avatar: 'https://i.pravatar.cc/150?u=u4' },
    ],
    nextContribution: null,
  },
];

export const RECENT_ACTIVITY = [
  {
    id: 't1',
    type: 'contribution',
    user: { name: 'Tajuz', avatar: 'https://i.pravatar.cc/150?u=u1' },
    amount: 250,
    capsuleId: 'c1',
    capsuleTitle: 'Family Holiday',
    date: '2h ago',
  },
  {
    id: 't2',
    type: 'memory',
    user: { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=u2' },
    capsuleId: 'c1',
    capsuleTitle: 'Family Holiday',
    content: 'Video message added',
    date: '5h ago',
  },
  {
    id: 't3',
    type: 'contribution',
    user: { name: 'Tajuz', avatar: 'https://i.pravatar.cc/150?u=u1' },
    amount: 500,
    capsuleId: 'c2',
    capsuleTitle: 'New Car Fund',
    date: '1d ago',
  },
];
