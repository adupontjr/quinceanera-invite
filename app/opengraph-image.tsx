import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = "Annika's Quinceañera — October 17, 2026";

export default async function OpengraphImage() {
    const photo = await readFile(join(process.cwd(), 'public/images/annika-hero.jpg'));
    const photoSrc = `data:image/jpeg;base64,${photo.toString('base64')}`;

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    background: '#FDF6F2',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        flex: 1,
                        padding: '0 72px',
                    }}
                >
                    <div
                        style={{
                            fontSize: 22,
                            letterSpacing: 6,
                            textTransform: 'uppercase',
                            color: '#9c8f87',
                        }}
                    >
                        Please join us for
                    </div>
                    <div
                        style={{
                            fontSize: 64,
                            color: '#1c1a18',
                            marginTop: 20,
                            lineHeight: 1.1,
                        }}
                    >
                        Annika&apos;s Quinceañera
                    </div>
                    <div
                        style={{
                            fontSize: 30,
                            color: '#B4165A',
                            marginTop: 28,
                        }}
                    >
                        October 17, 2026 · Perris, California
                    </div>
                </div>
                <img
                    src={photoSrc}
                    width={470}
                    height={630}
                    style={{ objectFit: 'cover' }}
                />
            </div>
        ),
        { ...size }
    );
}
