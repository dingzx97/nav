import React from 'react';
import { Layout, Server, Database, Wrench, Cloud, Compass, Star, Folder } from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-4 h-4' }) => {
  switch (name) {
    case 'Layout':
      return <Layout className={className} />;
    case 'Server':
      return <Server className={className} />;
    case 'Database':
      return <Database className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'Cloud':
      return <Cloud className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'Star':
      return <Star className={className} />;
    default:
      return <Folder className={className} />;
  }
};
