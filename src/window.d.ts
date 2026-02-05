import { HeadlessCheckoutModule, SecurefieldsModule, DropinModule } from './types';

interface Window {
  Purse:HeadlessCheckoutModule | DropinModule;
  PurseSecureFields:SecurefieldsModule;
}