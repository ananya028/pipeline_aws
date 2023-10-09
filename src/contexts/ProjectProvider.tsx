import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';

// Constants
import { STORAGE_KEY } from '@constants';

// Types
import { Logo, Favicon, Illustration, Icon } from '@types';

// Helpers
import { SessionStoreHelper } from '@helpers';

export interface ProjectProviderType {
  logo: Logo;
  icon: Icon;
  favicon: Favicon;
  illustration: Illustration;
  onSetLogo: (item: Logo) => void;
  onSetIcon: (item: Icon) => void;
  onSetFavicon: (item: Favicon) => void;
  onSetIllustration: (item: Illustration) => void;
  onResetProjectsValue: () => void;
  onCheckProjectSelected: () => Logo | Icon | Favicon | null;
}

export const ProjectContext = createContext<ProjectProviderType>({} as ProjectProviderType);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  // TODO: breakpoint should be a number
  const [logo, setLogo] = useState<Logo>({
    darkTheme: '',
    darkThemeMobile: '',
    isResponsive: false,
    hasAltText: true,
    alt: '',
    breakpoint: '',
  });
  const [icon, setIcon] = useState<Icon>({
    darkTheme: '',
    isDecorative: false,
    alt: '',
  });
  const [illustration, setIllustration] = useState<Illustration>({
    isResponsive: false,
    darkTheme: '',
    darkThemeMobile: '',
    isDecorative: false,
    alt: '',
    description: '',
    breakpoint: '',
  });
  const [favicon, setFavicon] = useState<Favicon>({
    favicon: false,
    darkTheme: '',
  });

  const handleCheckProjectSelected = () => {
    // TODO: this should be a state value on the top level projects component
    const project = SessionStoreHelper.getComplex<{
      icon?: Icon;
      logo?: Logo;
      illustration?: Illustration;
      favicon?: Favicon;
    }>(STORAGE_KEY.PROJECT);

    if (project && project.logo) return logo;
    if (project && project.icon) return icon;
    if (project && project.favicon) return favicon;
    if (project && project.illustration) return illustration;

    return null;
  };

  const handleSetLogo = (item: Logo) => {
    setLogo(item);
  };

  const handleSetIcon = (item: Icon) => {
    setIcon(item);
  };

  const handleSetFavicon = (item: Favicon) => {
    setFavicon(item);
  };

  const handleSetIllustration = (item: Illustration) => {
    setIllustration(item);
  };

  const handleResetProjectsValue = () => {
    SessionStoreHelper.removeItems(STORAGE_KEY.PROJECT);
    handleSetLogo({
      darkTheme: '',
      darkThemeMobile: '',
      isResponsive: false,
      hasAltText: true,
      alt: '',
      breakpoint: '',
    });
    handleSetIcon({
      darkTheme: '',
      isDecorative: false,
      alt: '',
    });
    handleSetFavicon({
      favicon: false,
      darkTheme: '',
    });
    handleSetIllustration({
      isResponsive: false,
      darkTheme: '',
      darkThemeMobile: '',
      isDecorative: false,
      alt: '',
      description: '',
      breakpoint: '',
    });
  };

  const initialize = () => {
    const project = SessionStoreHelper.getComplex<{
      icon?: Icon;
      logo?: Logo;
      illustration?: Illustration;
      favicon?: Favicon;
    }>(STORAGE_KEY.PROJECT);

    setIsInitialized(true);

    if (project && project.logo) {
      setLogo(project.logo);
    }

    if (project && project.icon) {
      setIcon(project.icon);
    }

    if (project && project.favicon) {
      setFavicon(project.favicon);
    }

    if (project && project.illustration) {
      setIllustration(project.illustration);
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, []);

  const value = useMemo<ProjectProviderType>(
    () => ({
      logo,
      icon,
      favicon,
      illustration,
      onSetLogo: handleSetLogo,
      onSetIcon: handleSetIcon,
      onSetFavicon: handleSetFavicon,
      onSetIllustration: handleSetIllustration,
      onResetProjectsValue: handleResetProjectsValue,
      onCheckProjectSelected: handleCheckProjectSelected,
    }),
    [
      logo,
      icon,
      favicon,
      illustration,
      handleSetLogo,
      handleSetIcon,
      handleSetFavicon,
      handleSetIllustration,
      handleResetProjectsValue,
      handleCheckProjectSelected,
    ]
  );

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
