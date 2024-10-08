<template>
  <div
    v-if="!provider"
    class="border border-slate-25 dark:border-slate-800/60 bg-white dark:bg-slate-900 h-full p-6 w-full md:w-full max-w-full md:max-w-[75%] flex-shrink-0 flex-grow-0"
  >
    <page-header
      class="max-w-4xl"
      :header-title="$t('INBOX_MGMT.ADD.EMAIL_PROVIDER.TITLE')"
      :header-content="$t('INBOX_MGMT.ADD.EMAIL_PROVIDER.DESCRIPTION')"
    />
    <div class="grid max-w-3xl grid-cols-4 mx-0 mt-6">
      <channel-selector
        v-for="emailProvider in emailProviderList"
        :key="emailProvider.key"
        :class="{ inactive: !emailProvider.isEnabled }"
        :title="emailProvider.title"
        :src="emailProvider.src"
        @click="() => onClick(emailProvider)"
      />
    </div>
  </div>
  <microsoft v-else-if="provider === 'microsoft'" />
  <google v-else-if="provider === 'google'" />
  <forward-to-option v-else-if="provider === 'other_provider'" />
</template>
<script setup>
import { ref, computed } from 'vue';
import ForwardToOption from './emailChannels/ForwardToOption.vue';
import Microsoft from './emailChannels/Microsoft.vue';
import Google from './emailChannels/Google.vue';
import ChannelSelector from 'dashboard/components/ChannelSelector.vue';
import PageHeader from '../../SettingsSubPageHeader.vue';

import { useStoreGetters } from 'dashboard/composables/store';
import { useI18n } from 'dashboard/composables/useI18n';

const provider = ref('');

const getters = useStoreGetters();
const { t } = useI18n();

const globalConfig = getters['globalConfig/get'];
const isABchatInstance = getters['globalConfig/isABchatInstance'];

const emailProviderList = computed(() => {
  return [
    {
      title: t('INBOX_MGMT.EMAIL_PROVIDERS.MICROSOFT'),
      isEnabled: !!globalConfig.value.azureAppId,
      key: 'microsoft',
      src: '/assets/images/dashboard/channels/microsoft.png',
    },
    {
      title: t('INBOX_MGMT.EMAIL_PROVIDERS.GOOGLE'),
      isEnabled: !!window.bchatConfig.googleOAuthClientId,
      key: 'google',
      src: '/assets/images/dashboard/channels/google.png',
    },
    {
      title: t('INBOX_MGMT.EMAIL_PROVIDERS.OTHER_PROVIDERS'),
      isEnabled: true,
      key: 'other_provider',
      src: '/assets/images/dashboard/channels/email.png',
    },
  ].filter(providerConfig => {
    if (isABchatInstance.value) {
      return true;
    }
    return providerConfig.isEnabled;
  });
});

function onClick(emailProvider) {
  if (emailProvider.isEnabled) {
    this.provider = emailProvider.key;
  }
}
</script>
