import mixpanel from "mixpanel-browser";

import { Modal, ModalOverlay, ModalContent, Link, Text } from "@chakra-ui/react";

import { Column } from "../../utils/chakra";
import { isValidAPIKey } from "../../utils/apikey";
import { APIKeyInput } from "../utils/APIKeyInput";

export function APIKeyModal({
  apiKey,
  setApiKey,
}: {
  apiKey: string | null;
  setApiKey: (apiKey: string) => void;
}) {
  const setApiKeyTracked = (apiKey: string) => {
    setApiKey(apiKey);

    if (isValidAPIKey(apiKey)) {
      mixpanel.track("Entered API Key");

      // Hacky way to get the prompt box to focus after the
      // modal closes. Long term should probably use a ref.
      window.document.getElementById("promptBox")?.focus();
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={() => {}}
      size="3xl"
      isCentered={true}
      // TODO: We really should trap focus here but for some reason this
      // is the only way to get Chakra not to auto focus on the first link.
      trapFocus={false}
    >
      <ModalOverlay />
      <ModalContent>
        <Column mainAxisAlignment="center" crossAxisAlignment="center" height="500px">
          <APIKeyInput apiKey={apiKey} setApiKey={setApiKeyTracked} />
          <Text mt={5} width="80%" textAlign="center" fontSize="md">
            We will <u>never</u> upload, log, or store your API key outside of your
            browser's local storage. Verify for yourself{" "}
            <Link href="https://github.com/transmissions11/flux" color="green" isExternal>
              here
            </Link>
            .
          </Text>
        </Column>
      </ModalContent>
    </Modal>
  );
}
