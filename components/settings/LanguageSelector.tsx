"use client";

import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GB, FR, DE, ES, IT } from 'country-flag-icons/react/3x2';

const languages = [
  { code: 'en', name: 'English', icon: GB },
  { code: 'fr', name: 'Français', icon: FR },
  { code: 'de', name: 'Deutsch', icon: DE },
  { code: 'es', name: 'Español', icon: ES },
  { code: 'it', name: 'Italiano', icon: IT },
];

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-full bg-zinc-800 border-zinc-700">
        <SelectValue placeholder={t('settings.language')} />
      </SelectTrigger>
      <SelectContent>
        {languages.map(({ code, name, icon: Icon }) => (
          <SelectItem key={code} value={code}>
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span>{t(`languages.${code}`)}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}