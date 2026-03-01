import { Compass, Landmark, Lightbulb, Leaf, Camera } from 'lucide-react';

interface Props {
  selected: string;
  onChange: (category: string) => void;
}

const CATEGORIES = [
  { label: 'All', value: '', icon: null },
  { label: 'Travel Stories', value: 'Travel Stories', icon: Compass },
  { label: 'Culture & Heritage', value: 'Culture & Heritage', icon: Landmark },
  { label: 'Tips & Guides', value: 'Tips & Guides', icon: Lightbulb },
  { label: 'Sustainability & Volunteering', value: 'Sustainability & Volunteering', icon: Leaf },
  { label: 'Photography', value: 'Photography', icon: Camera },
];

const BlogCategoryFilter = ({ selected, onChange }: Props) => {
  const row1 = CATEGORIES.slice(0, 5);
  const row2 = CATEGORIES.slice(5);

  const btn = (cat: typeof CATEGORIES[0]) => {
    const active = selected === cat.value;
    const Icon = cat.icon;
    return (
      <button
        key={cat.value}
        onClick={() => onChange(cat.value)}
        className={`h-9 px-5 rounded-full text-xs font-medium flex items-center gap-2 transition-colors ${
          active
            ? 'bg-[#2b1b14] text-white'
            : 'bg-white border border-black/50 text-gray-700 hover:bg-gray-100'
        }`}
      >
        {Icon && <Icon size={14} />}
        {cat.label}
      </button>
    );
  };

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {row1.map(btn)}
      </div>
      <div className="flex justify-center">
        {row2.map(btn)}
      </div>
    </div>
  );
};

export default BlogCategoryFilter;
