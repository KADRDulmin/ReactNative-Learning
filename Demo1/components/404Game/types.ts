// app/components/404Game/types.ts
import { ViewStyle } from 'react-native';

export type MedicalIconName = 'local-hospital' | 'favorite' | 'healing' | 'medical-services' | 'remove-red-eye';

export interface FloatingIconProps {
    onCatch: () => void;
    position: number;
}

export interface GameIcon {
    id: string;
    position: number;
    startY: number;
    iconType: MedicalIconName;
}

export interface BenefitTooltipProps {
    benefit: string;
    visible: boolean;
}

export type WebViewStyle = {
    WebkitTapHighlightColor?: string;
    cursor?: string;
} & ViewStyle;