import type { ElementType } from 'react';
import {
  Code2,
  AtSign,
  Binary,
  Lock,
  FileCode,
  KeyRound,
  FileText,
  UserCheck,
} from 'lucide-react';

export type TabType =
  | 'strings'
  | 'email'
  | 'base64'
  | 'encode'
  | 'uuid-hash'
  | 'json'
  | 'lipsum'
  | 'qa-profile';

export const TAB_LIST: { id: TabType; label: string; icon: ElementType }[] = [
  { id: 'strings', label: 'Random String', icon: KeyRound },
  { id: 'email', label: 'Random Email', icon: AtSign },
  { id: 'qa-profile', label: 'QA User Profile', icon: UserCheck },
  { id: 'base64', label: 'Base64 Encoder', icon: Binary },
  { id: 'encode', label: 'URL & HTML', icon: Code2 },
  { id: 'uuid-hash', label: 'UUID & Hashes', icon: Lock },
  { id: 'json', label: 'Text Case & JSON', icon: FileCode },
  { id: 'lipsum', label: 'Lorem Ipsum', icon: FileText },
];
