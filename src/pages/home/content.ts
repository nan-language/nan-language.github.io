import type { Annotation } from "../../components/AnnotatedCode";

export type Row = {
  label: string;
  detail: string;
  nan: boolean;
  rust: boolean;
  cpp: boolean;
};

export const comparison: { group: string; rows: Row[] }[] = [
  {
    group: "Performance",
    rows: [
      {
        label: "Compiled to native code",
        detail:
          "Programs build to native images: no virtual machine, no interpreter.",
        nan: true,
        rust: true,
        cpp: true,
      },
      {
        label: "No garbage collector",
        detail:
          "No collector and no mandatory runtime to ship with your program.",
        nan: true,
        rust: true,
        cpp: true,
      },
      {
        label: "No undefined behaviour in safe code",
        detail: "Every operation in safe code has a defined meaning.",
        nan: true,
        rust: true,
        cpp: false,
      },
    ],
  },
  {
    group: "Made for AI",
    rows: [
      {
        label: "A line means only what it names",
        detail: "No imports, no overloading, nothing inferred from elsewhere.",
        nan: true,
        rust: false,
        cpp: false,
      },
      {
        label: "Contracts checked by a built-in prover",
        detail:
          "Broken calls are refuted before they run, and proven checks vanish from the code.",
        nan: true,
        rust: false,
        cpp: false,
      },
      {
        label: "Authority you can audit",
        detail:
          "No global I/O, clock or allocator: code acts only through the capabilities it is given.",
        nan: true,
        rust: false,
        cpp: false,
      },
      {
        label: "Versions computed from the code",
        detail: "Compatibility is decided per item, never declared by hand.",
        nan: true,
        rust: false,
        cpp: false,
      },
      {
        label: "A primer for agents",
        detail:
          "nan primer teaches the language to an agent in under 8,000 tokens.",
        nan: true,
        rust: false,
        cpp: false,
      },
    ],
  },
];

export const sample = `const MAX_SAMPLES: u32 = 1_000

/// Running total of the values passed to [Meter.record].
pub closed struct Meter {
    pub total: u64
    pub samples: u32 where samples <= MAX_SAMPLES
} Meter

pub fn Meter.record(mut self, value: u32)
    requires self.samples < MAX_SAMPLES
{
    self.total += u64.widen(value)
    self.samples += 1
} Meter.record

pub fn Meter.mean(self) -> Option[u64]
    example Meter(total: 9, samples: 3).mean() == Some(3)
{
    if self.samples == 0 {
        return None
    }
    return Some(self.total / u64.widen(self.samples))
} Meter.mean`;

export const annotations: Annotation[] = [
  {
    line: 6,
    keyword: "where",
    title: "Invariants in the type",
    body: "samples never exceeds MAX_SAMPLES. Every write is checked or proven against it.",
  },
  {
    line: 10,
    keyword: "requires",
    title: "Contracts at the head",
    body: "A call is checked against the callee's head alone. The prover removes every check it proves unneeded.",
  },
  {
    line: 17,
    keyword: "example",
    title: "Examples that run",
    body: "Examples are part of the contract and run on every check.",
  },
];
