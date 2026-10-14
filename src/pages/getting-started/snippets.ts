export const install = `$ curl -fsSL https://raw.githubusercontent.com/nan-language/nan/main/install.sh | sh`;

export const manifest = `//! A first NaN program.

package hello {
    language 1
    targets x86_64-host
    entry main
} hello`;

export const hello = `//! A first NaN program.

fn main(take world: host::World) fails sys::StdioError uses wait {
    try await world.stdio.write_out(b"Hello, NaN!\\n")
} main`;

export const run = `$ nan run
Hello, NaN!`;

export const mean = `//! Small arithmetic helpers.

/// The mean of a non-empty run of values, rounded down.
pub fn mean(total: u64, count: u64) -> u64
    requires count > 0
    example mean(9, count: 3) == 3
{
    return total / count
} mean

test mean_rounds_down for mean {
    expect mean(10, count: 4) == 2
} mean_rounds_down`;

export const test = `$ nan test
ok test hello: errors 0, incomplete 0, tests 1, failed 0`;

export const broken = `//! A call that breaks a contract.

pub fn average_of_nothing() -> u64 = mean(10, count: 0)`;

export const check = `$ nan check
failed check hello: errors 1, incomplete 0
error proof.refuted hello/broken.nan:3 hello::average_of_nothing
    pub fn average_of_nothing() -> u64 = mean(10, count: 0)`;

export const primer = `$ nan primer
$ nan primer contracts`;

export const commands = [
  ["nan check", "Report the diagnostics of a package or narrower scope"],
  ["nan fmt", "Rewrite files into canonical format"],
  ["nan run", "Build and run a program"],
  ["nan test", "Run the tests of a scope"],
  ["nan show <path> --api", "Print the head, contracts and digest of any item"],
  ["nan primer", "Print the primer for an agent"],
];
