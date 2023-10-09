import { Flex, Title, Text } from '@mantine/core';

export const PageTitle = ({ title, stepNumber }: { title: string; stepNumber: number }) => (
  <>
    <Flex justify="space-between" align="center">
      <Title order={2} variant="xl">
        {title}
      </Title>
      {stepNumber && <Text variant="xs"> Step {stepNumber} of 3</Text>}
    </Flex>
  </>
);
