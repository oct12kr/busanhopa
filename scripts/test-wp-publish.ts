import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { publishPost } from "../lib/wordpress";

function loadEnvFile(filePath: string) {
  if (!existsSync(filePath)) {
    return;
  }

  const content = readFileSync(filePath, "utf8");

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const match = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);

    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;

    if (process.env[key]) {
      continue;
    }

    const value = rawValue
      .replace(/^['"]|['"]$/g, "")
      .replace(/\\n/g, "\n")
      .trim();

    process.env[key] = value;
  }
}

async function main() {
  loadEnvFile(resolve(process.cwd(), ".env"));

  const timestamp = new Date().toISOString();
  const title = `부산호빠 워드프레스 자동 발행 테스트 ${timestamp}`;
  const content = `
    <p>이 글은 부산호빠 랜딩페이지 워드프레스 REST API 연동 테스트로 생성된 draft 글입니다.</p>
    <p>테스트 완료 후 워드프레스 관리자에서 삭제해도 됩니다.</p>
  `;

  console.log("[WP TEST] draft 글 발행을 시작합니다.");

  try {
    const post = await publishPost(title, content, [], "draft");
    console.log(`[WP TEST] 성공: draft 글이 생성되었습니다. postId=${post.id}, status=${post.status}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "알 수 없는 오류";
    console.error(`[WP TEST] 실패: ${message}`);
    process.exitCode = 1;
  }
}

void main();
