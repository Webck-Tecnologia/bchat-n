export const useInstallationName = (str, installationName) => {
  if (str && installationName) {
    return str.replace(/Bchat/g, installationName);
  }
  return str;
};

export default {
  methods: {
    useInstallationName,
  },
};
