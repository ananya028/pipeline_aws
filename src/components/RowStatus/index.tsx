import { Flex, Image, Text, useMantineColorScheme } from '@mantine/core';

// Helpers
import { ColorHelper } from '@helpers';

// Assets
import { iconSuccessDark, iconSuccessLight } from '@assets';

export const RowStatus = ({ step }: { step: string }) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Flex w="100%" justify="space-between">
      <Flex w="70%">
        <Image
          width={24}
          height={24}
          src={ColorHelper.getColorScheme(colorScheme, iconSuccessDark, iconSuccessLight)}
          alt="icon"
        />
        <Text ml="8px">{step}</Text>
      </Flex>
    </Flex>
  );
};
