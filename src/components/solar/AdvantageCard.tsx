'use client';

import { gsap } from 'gsap';
import {
    Award,
    CheckCircle,
    Lightbulb,
    Shield,
    Star,
    Target,
    TrendingUp,
    Zap
} from 'lucide-react';
import React, { useEffect, useRef } from 'react';

interface AdvantageCardProps {
    advantage: string;
    gradient: string;
    index: number;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ advantage, gradient, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(cardRef.current,
                { opacity: 0, y: 30, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: 'back.out(1.7)'
                }
            );
        }
    }, [index]);

    // Get appropriate icon based on advantage content
    const getAdvantageIcon = (advantageText: string) => {
        const lowerText = advantageText.toLowerCase();

        if (lowerText.includes('hafif') || lowerText.includes('taşın')) return Lightbulb;
        if (lowerText.includes('verim') || lowerText.includes('enerji')) return Zap;
        if (lowerText.includes('dayanık') || lowerText.includes('ömür')) return Shield;
        if (lowerText.includes('garanti') || lowerText.includes('kalite')) return Award;
        if (lowerText.includes('ekonomik') || lowerText.includes('maliyet')) return TrendingUp;
        if (lowerText.includes('kurulum') || lowerText.includes('kolay')) return Target;
        if (lowerText.includes('estetik') || lowerText.includes('görünüm')) return Star;

        return CheckCircle; // Default icon
    };

    const IconComponent = getAdvantageIcon(advantage);
    const [title, description] = advantage.split(':');

    return (
        <div
            ref={cardRef}
            className="group relative bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-gray-300"
        >
            <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} p-3 flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <IconComponent className="w-full h-full text-white" />
                </div>

                {/* Content */}
                <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                        {title}
                    </h4>
                    {description && (
                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {description.trim()}
                        </p>
                    )}
                </div>
            </div>

            {/* Hover Effect Border */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
        </div>
    );
};

export default AdvantageCard;
