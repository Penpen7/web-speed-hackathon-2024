import styled from 'styled-components';

const _Image = styled.img`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

export const HeroImage: React.FC = () => {
  return <_Image src="/assets/hero-image.webp" alt="Cyber TOON" />;
};
