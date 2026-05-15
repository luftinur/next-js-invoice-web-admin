"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Download, QrCode } from "lucide-react";

interface QRGeneratorProps {
  className?: string;
  defaultText?: string;
  size?: number;
}

export function QRGenerator({ className, defaultText = "", size = 200 }: QRGeneratorProps) {
  const [text, setText] = useState(defaultText);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const downloadQR = () => {
    const svg = document.getElementById("qr-code-svg") as unknown as SVGSVGElement;
    if (!svg) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const svgData = new XMLSerializer().serializeToString(svg);
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <Card className={cn("p-4", className)}>
      <CardContent className="space-y-4 p-0">
        <div className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-muted-foreground" />
          <p className="text-sm font-medium">QR Code Generator</p>
        </div>

        <div className="flex justify-center">
          <div className="rounded-lg border p-3 bg-white">
            <QRCodeSVG
              id="qr-code-svg"
              value={text || "https://invoicecore.io"}
              size={size}
              fgColor={fgColor}
              bgColor={bgColor}
              level="M"
              includeMargin
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Content</label>
          <Input
            placeholder="Enter text or URL..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Foreground</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border"
              />
              <span className="text-xs font-mono text-muted-foreground">{fgColor}</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Background</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-8 w-8 cursor-pointer rounded border"
              />
              <span className="text-xs font-mono text-muted-foreground">{bgColor}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={downloadQR}
          disabled={!text}
          className="w-full gap-2 cursor-pointer"
          size="sm"
        >
          <Download className="h-4 w-4" /> Download PNG
        </Button>
      </CardContent>
    </Card>
  );
}
