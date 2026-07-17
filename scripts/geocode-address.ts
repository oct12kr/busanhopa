import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const address = "부산광역시 해운대구 해운대해변로298번길 25";
const envPath = resolve(process.cwd(), ".env");

function loadEnvFile() {
  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex < 0) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");

    if (key && value && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

async function main() {
  loadEnvFile();

  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Google Geocoding API 키가 없습니다. .env에 GOOGLE_MAPS_API_KEY 또는 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY를 추가해 주세요."
    );
  }

  const params = new URLSearchParams({
    address,
    key: apiKey,
    language: "ko",
    region: "kr"
  });
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`);
  const payload = (await response.json()) as {
    status: string;
    error_message?: string;
    results?: Array<{
      formatted_address?: string;
      geometry?: {
        location?: {
          lat: number;
          lng: number;
        };
      };
    }>;
  };

  if (payload.status !== "OK") {
    throw new Error(`Google Geocoding API 조회 실패: ${payload.status}${payload.error_message ? ` - ${payload.error_message}` : ""}`);
  }

  const result = payload.results?.[0];
  const location = result?.geometry?.location;

  if (!location) {
    throw new Error("Google Geocoding API 응답에서 좌표를 찾을 수 없습니다.");
  }

  console.log(
    JSON.stringify(
      {
        address,
        formattedAddress: result?.formatted_address,
        lat: location.lat,
        lng: location.lng
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
