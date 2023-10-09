import { Anchor, Box, Button, Flex, MantineTheme, Text } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { useNavigate } from 'react-router-dom';
import { ReactElement, ReactNode, useContext, useState } from 'react';

// Assets
import { iconInfoErrorDark, iconInfoErrorLight, iconSuccessDark, iconSuccessLight } from '@assets';

// Helpers
import { ColorHelper, SessionStoreHelper } from '@helpers';

// Contexts
import { ProjectContext, SvgContext } from '@contexts';

// Constants
import { ROUTES_AUTH, STORAGE_KEY } from '@constants';

// Types
import { Favicon, Icon, Illustration, Logo } from '@types';

// Components
import { AnchorNewWindowCustom, InputFile, PageTitle, StatusUpload } from '@components';
import { UploadLayout } from '@layouts';

export const UploadFile = () => {
  const navigate = useNavigate();
  const { logo, illustration } = useContext(ProjectContext);
  const { onLoadImages } = useContext(SvgContext);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [filesMobile, setFilesMobile] = useState<FileWithPath[]>([]);
  const [isLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  // const [uploadedFiles, setUploadedFile] = useState<UploadedFile[]>([]);
  const [statusUpload, setStatusUpload] = useState({
    isSuccess: false,
    isFail: false,
  });

  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleTryAgain = () => {
    handlePrevStep();
    setStatusUpload({
      isFail: false,
      isSuccess: false,
    });
    window.scrollTo(0, 0);
  };

  const handleButtonBack = () => {
    const project = SessionStoreHelper.getComplex<{
      icon?: Icon;
      logo?: Logo;
      illustration?: Illustration;
      favicon?: Favicon;
    }>(STORAGE_KEY.PROJECT);

    switch (true) {
      case !!(project && project.favicon):
        navigate(ROUTES_AUTH.FAVICON);
        break;
      case !!(project && project.icon):
        navigate(ROUTES_AUTH.ICON);
        break;

      case !!(project && project.illustration):
        navigate(ROUTES_AUTH.ILLUSTRATIONS);
        break;

      case !!(project && project.logo):
        navigate(ROUTES_AUTH.LOGO);
        break;

      default:
        navigate(ROUTES_AUTH.PROJECTS);
        break;
    }
  };

  const handleRedirectPreview = () => {
    navigate(ROUTES_AUTH.PREVIEW);
  };

  const handleUploadFile = () => {
    // TODO: call API to upload file

    window.scrollTo(0, 0);
    onLoadImages(filesMobile, files);
    setStep(2);
    try {
      setStatusUpload((prev) => ({ ...prev, isSuccess: true }));
    } catch (error) {
      setStatusUpload((prev) => ({ ...prev, isFail: true }));
    }
  };

  const CommonUploadFile = ({
    title,
    titleForm,
    titleFormMobile,
    childrenMobile,
    children,
  }: {
    title: string;
    titleForm: string;
    titleFormMobile?: string;
    childrenMobile?: ReactElement;
    children: ReactNode;
  }) => (
    <>
      <PageTitle title={title} stepNumber={2} />
      <Flex direction={{ base: 'column', sm: 'row' }} pt="25px" gap="32px">
        <Flex direction="column" gap="25px">
          <Flex gap="20px" direction="column" align={{ base: 'center', sm: 'normal' }}>
            <Box
              w={{ base: '325px', lg: '420px' }}
              p="16px"
              sx={(theme: MantineTheme) => ({
                backgroundColor: ColorHelper.getColorScheme(
                  theme.colorScheme,
                  theme.colors.dark[2],
                  theme.colors.light[1]
                ),
                border: `1px solid ${theme.colors.dark[0]}`,
                boxShadow: theme.colors.shadow[0],
                borderRadius: '4px',
              })}
            >
              <Text
                variant="xs"
                sx={(theme: MantineTheme) => ({
                  fontFamily: theme.other.fonts[0],
                })}
              >
                {titleForm}
              </Text>
              {children}
            </Box>
          </Flex>
          {(logo.isResponsive || illustration.isResponsive) && (
            <Flex gap="20px" direction="column" align={{ base: 'center', sm: 'normal' }}>
              <Box
                w="max-content"
                p="16px"
                sx={(theme: MantineTheme) => ({
                  backgroundColor: ColorHelper.getColorScheme(
                    theme.colorScheme,
                    theme.colors.dark[2],
                    theme.colors.light[1]
                  ),
                  border: `1px solid ${theme.colors.dark[0]}`,
                  boxShadow: theme.colors.shadow[0],
                  borderRadius: '4px',
                })}
              >
                <Text
                  variant="xs"
                  sx={(theme: MantineTheme) => ({
                    fontFamily: theme.other.fonts[0],
                  })}
                >
                  {titleFormMobile}
                </Text>
                {childrenMobile}
              </Box>
            </Flex>
          )}
        </Flex>
        <Flex gap="15px" direction="column" pt="16px">
          <Text
            variant="md"
            sx={(theme: MantineTheme) => ({
              span: {
                fontWeight: theme.other.fw.bold,
              },
            })}
          >
            Please upload your light mode graphic.
            <br />
            <span>Accepts .svg files up to max 5 MB.</span>
          </Text>
        </Flex>
      </Flex>
    </>
  );

  return (
    <>
      {step === 1 && (
        <UploadLayout
          title="Upload File"
          ChildrenAction={
            <>
              <Button
                variant="primary"
                size="md"
                aria-label="View home page"
                onClick={handleButtonBack}
                ta="center"
              >
                Back
              </Button>

              <Button
                h="100%"
                variant="tertiary"
                size="md"
                type="submit"
                aria-label="view upload file"
                onClick={handleUploadFile}
                disabled={
                  !(logo.isResponsive || illustration.isResponsive
                    ? files.length > 0 && filesMobile.length > 0
                    : files.length > 0)
                }
              >
                Next
              </Button>
            </>
          }
        >
          {logo.isResponsive || illustration.isResponsive ? (
            <CommonUploadFile
              title="Upload File"
              titleForm="Upload Your Desktop SVG"
              titleFormMobile="Upload Your Mobile SVG"
              childrenMobile={
                <InputFile
                  onDrop={setFilesMobile}
                  fileName={filesMobile[0] ? filesMobile[0].name : ''}
                />
              }
            >
              <InputFile onDrop={setFiles} fileName={files[0] ? files[0].name : ''} />
            </CommonUploadFile>
          ) : (
            <CommonUploadFile title="Upload File" titleForm="Upload Your SVG">
              <InputFile onDrop={setFiles} fileName={files[0] ? files[0].name : ''} />
            </CommonUploadFile>
          )}
        </UploadLayout>
      )}

      {step === 2 && (
        <UploadLayout
          title="Upload File"
          ChildrenAction={
            <>
              {statusUpload.isFail ? (
                <>
                  <Anchor
                    href={process.env.VITE_LEARNING_CENTER}
                    variant="tertiary"
                    aria-label="View home page"
                    ta="center"
                    target="_blank"
                  >
                    Learning Center
                  </Anchor>
                  <Button
                    h="100%"
                    variant="tertiary"
                    size="md"
                    type="submit"
                    aria-label="view upload file"
                    disabled={isLoading}
                    onClick={handleTryAgain}
                  >
                    Try Again
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    h="100%"
                    variant="primary"
                    size="md"
                    type="submit"
                    aria-label="view upload file"
                    onClick={handlePrevStep}
                  >
                    Back
                  </Button>
                  <Button
                    h="100%"
                    variant="tertiary"
                    size="md"
                    type="submit"
                    aria-label="view upload file"
                    onClick={handleRedirectPreview}
                    disabled={isLoading}
                  >
                    Next
                  </Button>
                </>
              )}
            </>
          }
        >
          {statusUpload.isFail ? (
            <StatusUpload
              title="Fail"
              iconDark={iconInfoErrorDark}
              iconLight={iconInfoErrorLight}
              image={files[0] ? files[0].name : ''}
              sizeIconStatus={20}
              titleFormMobile="Your Mobile SVG"
              imageMobile={filesMobile[0] ? filesMobile[0].name : ''}
              titleForm="Your Desktop SVG"
            >
              <Text
                variant="md"
                sx={(theme: MantineTheme) => ({
                  span: {
                    fontWeight: theme.other.fw.bold,
                    color: ColorHelper.getColorScheme(
                      theme.colorScheme,
                      theme.colors.cyan[0],
                      theme.colors.cyan[2]
                    ),
                  },
                })}
              >
                Your upload was not successful. <br />
                <span>Please try again.</span>
              </Text>
              <Flex direction="column">
                <AnchorNewWindowCustom
                  href={process.env.VITE_LINK_ICON!}
                  title="Tips for Icon Optimization"
                />
                <AnchorNewWindowCustom
                  href={process.env.VITE_LINK_FAVICON!}
                  title="Tips for Favicon Optimization"
                />
              </Flex>
            </StatusUpload>
          ) : (
            <StatusUpload
              title="Success"
              iconDark={iconSuccessDark}
              iconLight={iconSuccessLight}
              image={files[0] ? files[0].name : ''}
              titleFormMobile="Your Mobile SVG"
              imageMobile={filesMobile[0] ? filesMobile[0].name : ''}
              titleForm="Your Desktop SVG"
            >
              <Text
                variant="md"
                sx={(theme: MantineTheme) => ({
                  span: {
                    fontWeight: theme.other.fw.bold,
                  },
                })}
                w={{ base: 'fit-content', md: '290px' }}
              >
                Your upload was successful.
              </Text>
            </StatusUpload>
          )}
        </UploadLayout>
      )}
    </>
  );
};
