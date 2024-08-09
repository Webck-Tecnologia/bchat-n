import { buildPortalArticleURL, buildPortalURL } from '../portalHelper';

describe('PortalHelper', () => {
  describe('buildPortalURL', () => {
    it('returns the correct url', () => {
      window.bchatConfig = {
        hostURL: 'https://app.bchat.com',
        helpCenterURL: 'https://help.bchat.com',
      };
      expect(buildPortalURL('handbook')).toEqual(
        'https://help.bchat.com/hc/handbook'
      );
      window.bchatConfig = {};
    });
  });

  describe('buildPortalArticleURL', () => {
    it('returns the correct url', () => {
      window.bchatConfig = {
        hostURL: 'https://app.bchat.com',
        helpCenterURL: 'https://help.bchat.com',
      };
      expect(
        buildPortalArticleURL('handbook', 'culture', 'fr', 'article-slug')
      ).toEqual('https://help.bchat.com/hc/handbook/articles/article-slug');
      window.bchatConfig = {};
    });
  });
});
