import { whatsappMessages, getWhatsAppLink, openWhatsAppChat, WHATSAPP_PHONE } from './whatsapp.ts';
import assert from 'node:assert';
import { describe, it } from 'node:test';

describe('WhatsApp Utilities', () => {
  it('getWhatsAppLink should return the correct URL for each message key in FR', () => {
    for (const key in whatsappMessages.fr) {
      const messageKey = key as keyof typeof whatsappMessages.fr;
      const expectedMessage = encodeURIComponent(whatsappMessages.fr[messageKey]);
      const expectedLink = `https://wa.me/${WHATSAPP_PHONE}?text=${expectedMessage}`;
      const actualLink = getWhatsAppLink(messageKey, "fr");

      assert.strictEqual(actualLink, expectedLink, `Failed for key ${messageKey} in FR`);
    }
  });

  it('getWhatsAppLink should return the correct URL for each message key in EN', () => {
    for (const key in whatsappMessages.en) {
      const messageKey = key as keyof typeof whatsappMessages.en;
      const expectedMessage = encodeURIComponent(whatsappMessages.en[messageKey]);
      const expectedLink = `https://wa.me/${WHATSAPP_PHONE}?text=${expectedMessage}`;
      const actualLink = getWhatsAppLink(messageKey, "en");

      assert.strictEqual(actualLink, expectedLink, `Failed for key ${messageKey} in EN`);
    }
  });

  it('openWhatsAppChat should call window.open with the correct arguments', () => {
    // Mock window
    const originalWindow = (global as any).window;
    let openedUrl = "";
    let openedTarget = "";

    const mockOpen = (url: string, target: string) => {
      openedUrl = url;
      openedTarget = target;
      return null;
    };

    (global as any).window = {
      open: mockOpen
    };

    try {
      const key: keyof typeof whatsappMessages.fr = 'auditGratuit';
      openWhatsAppChat(key, "fr");

      assert.strictEqual(openedTarget, "_blank", "Expected target _blank");

      const expectedUrl = getWhatsAppLink(key, "fr");
      assert.strictEqual(openedUrl, expectedUrl, "Expected correct WhatsApp URL");
    } finally {
      (global as any).window = originalWindow;
    }
  });

  it('openWhatsAppChat should do nothing when window is undefined', () => {
    const originalWindow = (global as any).window;
    delete (global as any).window;

    try {
      // Should not throw
      openWhatsAppChat('auditGratuit');
    } finally {
      (global as any).window = originalWindow;
    }
  });
});
