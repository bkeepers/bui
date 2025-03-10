import type { LucideIcon } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { Thermometer } from 'lucide-react-native';

export function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: 'style',
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

iconWithClassName(Thermometer);

export { Thermometer };
