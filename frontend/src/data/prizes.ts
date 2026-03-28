import type { PrizeDefinition } from '@/types/domain';

/**
 * PRIZE CONFIGURATION
 * weight = relative probability (higher = more likely)
 *
 * Total weight: 100
 */
export const PRIZES: PrizeDefinition[] = [
  {
    name: 'Giải Đặc Biệt',
    color: '#B71C1C',
    text: '#FFFFFF',
    desc: 'Xe máy Honda Vision 2026',
    icon: '🏆',
    weight: 1,
  },
  {
    name: 'Giải Nhất',
    color: '#FFD700',
    text: '#333333',
    desc: 'Smart TV Samsung 55" 4K',
    icon: '🥇',
    weight: 2,
  },
  {
    name: 'Giải Nhì',
    color: '#1B5E20',
    text: '#FFFFFF',
    desc: 'Tủ lạnh Panasonic Inverter',
    icon: '🥈',
    weight: 4,
  },
  {
    name: 'Giải Ba',
    color: '#E65100',
    text: '#FFFFFF',
    desc: 'Nồi cơm điện cao cấp Toshiba',
    icon: '🥉',
    weight: 8,
  },
  {
    name: 'Giải KK 1',
    color: '#0D4A2B',
    text: '#FFD700',
    desc: 'Bộ nồi Inox 5 món',
    icon: '🎁',
    weight: 15,
  },
  {
    name: 'Giải KK 2',
    color: '#880E4F',
    text: '#FFD700',
    desc: 'Bộ chén dĩa sứ cao cấp',
    icon: '🎁',
    weight: 18,
  },
  {
    name: 'Chúc May Mắn',
    color: '#37474F',
    text: '#FFFFFF',
    desc: 'Chúc bạn may mắn lần sau!',
    icon: '🍀',
    weight: 32,
  },
  {
    name: 'Giải KK 3',
    color: '#1565C0',
    text: '#FFFFFF',
    desc: 'Nón bảo hiểm Hợp Trí Summit',
    icon: '🎁',
    weight: 20,
  },
];
