import { injectable } from 'inversify';
import logger from '../lib/logger';
import { IMailProvider, Mail } from './IMailProvider';

@injectable()
export class ConsoleMailProvider implements IMailProvider {
  async sendMail(mail: Mail): Promise<string | null> {
    console.log(`[CONSOLE MAIL] Para: ${mail.to} | Assunto: ${mail.subject}`);
    console.log(`[CONSOLE MAIL] Texto: ${mail.text}`);
    logger.info(`E-mail exibido no console para ${mail.to}`);
    return 'console-mail-preview-url';
  }
}